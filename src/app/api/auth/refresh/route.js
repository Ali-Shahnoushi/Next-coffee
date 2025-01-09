import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, verifyToken } from "@/utils/auth";
// Use (You)

// Tickets -> Status 401 -> Req /auth/Refresh -> 200, 401 -> /login-register

export async function POST(req) {
  try {
    connectToDB();

    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return Response.json(
        { message: "no have refresh Token !!" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return Response.json(
        { message: "no have refresh Token !!" },
        { status: 401 }
      );
    }

    verifyToken(refreshToken, process.env.RefreshTokenSecretKey);
    const newAccessToken = generateAccessToken({ email: user.email });

    return Response.json(
      { message: "Access token refreshed." },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    console.log(err);

    return Response.json(
      { message: "Invalid or expired refresh token" },
      { status: 403 }
    );
  }
}
