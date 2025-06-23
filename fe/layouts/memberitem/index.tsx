import styles from "./Styles.module.css";

type MemberItemProps = {
  moreBtn?: JSX.Element;
  name: string;
  profilePicUrl: string;
  badge: JSX.Element;
};

const MemberItem = ({
  moreBtn,
  badge,
  name = "",
  profilePicUrl = "",
}: MemberItemProps) => {
  return (
    <div className={styles.memberItem}>
      <div className={styles.profileContainer}>
        <div className={styles.profileImgContainer}>
          <img
            src={profilePicUrl ? profilePicUrl : "/images/image/person.png"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            width={150}
            height={150}
            alt="Member Profile Picture"
          />
        </div>
        <div className={styles.profileBody}>
          {badge ? badge : <></>}
          <p className={styles.memberName}>{name}</p>
        </div>
      </div>
      {moreBtn ? moreBtn : <></>}
    </div>
  );
};

export default MemberItem;
