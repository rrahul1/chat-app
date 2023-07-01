import React, { memo } from "react";
import ProfileAvatar from "../../dashboard/ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoBtn from "./ProfileInfoBtn";
import PresenceDot from "../../PresenceDot";
import { Button } from "rsuite";
import { useCurrentRoom } from "../../../context/current-room.context";
import { auth } from "../../../misc/firebase";
import { useHover, useMediaQuery } from "../../../misc/custom-hooks";
import LikeBtn from "./LikeBtn";

function MessageItem({ message, handleAdmin, handleLike }) {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHover] = useHover();

  const isMobile = useMediaQuery("(max-width: 992px)");

  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author?.uid);

  const isAuthor = auth?.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const canShowIcons = isMobile || isHover;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHover ? "bg-black-02" : ""}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author?.uid} />
        <ProfileAvatar
          src={author?.avatar}
          name={author?.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtn
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button
              block
              color="orange"
              onClick={() => handleAdmin(author?.uid)}
            >
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin in this role"}
            </Button>
          )}
        </ProfileInfoBtn>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <LikeBtn
          {...(isLiked ? { color: "red" } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message?.id)}
          badgeContent={likeCount}
        />
      </div>

      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
}

export default memo(MessageItem);
