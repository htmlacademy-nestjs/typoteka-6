import { Comment, Entity, StorableEntity } from '@project/shared/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt: Date;
  public updatedAt: Date;
  public postId?: string;
  public message: string;
  public userId: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (! comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.message = comment.message;
    this.postId = comment.postId ?? undefined;
    this.userId = comment.userId;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
