export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export type NotificationProp = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FolderProp = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type VideoProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clearkId: string | null;
      trial: boolean | null;
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
    } | null;
    title: string;
    description: string | null;
    source: string;
    view: number;
    createdAt: Date;
    processing: boolean;
    summary: string;
  };
  author: boolean;
};

export type CommentRepliesProps = {
  id: string
  comment: string
  createdAt: Date
  commentId: string | null
  userId: string | null
  videoId: string | null
  User: {
    id: string
    email: string
    firstname: string | null
    lastname: string | null
    createdAt: Date
    clerkid: string
    image: string | null
    trial: boolean
    firstView: boolean
  } | null
}

export type CommetReplyProps = {
  id: string;
  comment: string;
  commetId: string;
  createdAt: Date;
  userId: string;
  videoId: string;
  User: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    clearkid: string;
    image: string | null;
    trail: boolean;
    firstview: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string
      email: string
      firstname: string | null
      lastname: string | null
      createdAt: Date
      clerkid: string
      image: string | null
      trial: boolean
      firstView: boolean
    } | null
    reply: CommentRepliesProps[]
    id: string
    comment: string
    createdAt: Date
    commentId: string | null
    userId: string | null
    videoId: string | null
  }[]
}