import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ comments, title, productId }) => {

  return (
    <div>
      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>نظرات برای {title}</p>
          <div>
            {comments.map(
              (comment) =>
                comment.isAccepted && <Comment key={comment._id} {...comment} />
            )}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productId={productId} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
