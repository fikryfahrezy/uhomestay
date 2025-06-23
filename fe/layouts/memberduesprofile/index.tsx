import type { MemberDetailRes } from "@/services/member";
import ProfileTable from "@/layouts/profiletable";
import styles from "./Styles.module.css";

type MemberDuesProfileProps = {
  member: MemberDetailRes;
};

const MemberDuesProfile = ({ member }: MemberDuesProfileProps) => {
  const { profile_pic_url: profileUrl, name } = member;
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileImgContainer}>
          <img
            src={profileUrl ? profileUrl : "/images/image/person.png"}
            style={{ width: "100%", height: "100%" }}
            width={150}
            height={150}
            alt="Member Profile Picture"
          />
        </div>
        <h2 className={styles.profileName}>{name}</h2>
      </div>
      <ProfileTable data={member} />
    </>
  );
};

export default MemberDuesProfile;
