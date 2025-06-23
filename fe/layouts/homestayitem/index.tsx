import type { MemberHomestaysRes } from "@/services/member-homestay";
import styles from "./Styles.module.css";

const defaultFunc = () => {};

type HomestayItemProps = {
  homestayData: MemberHomestaysRes;
  onClick?: (homestayData: MemberHomestaysRes) => void;
};

const GalleryItem = ({
  homestayData,
  onClick = defaultFunc,
}: HomestayItemProps) => {
  const { name, address, thumbnail_url: url } = homestayData;

  return (
    <div
      className={styles.cardContainer}
      onClick={() => onClick(homestayData)}
      data-testid="homestay-card-container"
    >
      <div className={styles.cardContent}>
        <div className={styles.bannerContainer}>
          <img
            src={url ? url : "/images/image/login-bg.svg"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Homestay Thumbnail"
          />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.bannerTitle}>{name}</h3>
          <p className={styles.bannerDescription}>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
