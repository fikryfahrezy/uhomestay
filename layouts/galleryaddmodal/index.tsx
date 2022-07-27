import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { addImage } from "@/services/images";
import { UniversalPortal } from "@/lib/react-portal-universal";
import Button from "cmnjg-sb/dist/button";
import IconButton from "cmnjg-sb/dist/iconbutton";
import ImagePicker from "cmnjg-sb/dist/imagepicker";
import TextArea from "cmnjg-sb/dist/textarea";
import styles from "./Styles.module.css";

export type GalleryAddModalType = "add";
type OnEvent = (
  type: GalleryAddModalType,
  title?: string,
  message?: string
) => void;

const defaultFunc = () => {};

type GalleryAddModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmited: OnEvent;
  onError: OnEvent;
  onLoading: OnEvent;
};
const GalleryAddModal = ({
  isOpen = false,
  onSubmited = defaultFunc,
  onCancel = defaultFunc,
  onError = defaultFunc,
  onLoading = defaultFunc,
}: GalleryAddModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  const defaultValues = {
    description: "",
    file: [],
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });

  const addImageMutation = useMutation<
    unknown,
    unknown,
    Parameters<typeof addImage>[0]
  >((data) => {
    return addImage(data);
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {
      if (v instanceof FileList && v.length !== 0) {
        formData.append(k, v[0]);
      } else {
        formData.append(k, String(v));
      }
    });

    onLoading("add", "Loading mengunggah foto");

    addImageMutation
      .mutateAsync(formData)
      .then(() => {
        reset(defaultValues, { keepDefaultValues: true });
        onSubmited("add", "Sukses mengunggah foto");
      })
      .catch((e) => {
        onError("add", "Error mengunggah foto", e.message);
      });
  });

  const onClose = () => {
    onCancel();
  };

  const onPick = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    setSelectedFile(files[0]);
  };

  const onPickErr = () => {
    onError("add", "Error tipe file", "File bukan bertipe gambar");
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImgUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return isOpen ? (
    <UniversalPortal selector="#modal">
      <div className={styles.modal}>
        <div className={styles.modalBody}>
          <h2 className={styles.pageTitle}>Unggah Foto</h2>
          <form onSubmit={onSubmit} data-testid="gallery-add-modal-form">
            <div className={styles.inputGroup}>
              <ImagePicker
                {...register("file", {
                  required: true,
                })}
                label="File foto:"
                id="file"
                multiple={false}
                required={true}
                value={
                  getValues().file.length === 0
                    ? ""
                    : (getValues().file as File[])[0].name
                }
                onErr={() => onPickErr()}
                onPick={(files) => onPick(files)}
                isInvalid={errors.file !== undefined}
                errMsg={errors.file ? "Tidak boleh kosong" : ""}
                className={styles.borderBox}
                data-testid="image-picker-input"
              >
                Pilih File
              </ImagePicker>
            </div>
            <div className={styles.inputGroup}>
              <TextArea
                {...register("description")}
                label="Deskripsi:"
                id="description"
                className={styles.borderBox}
              />
            </div>
            <div className={styles.inputGroup}>
              {imgUrl ? (
                <img src={imgUrl} className={styles.img} alt="Photo Preview" />
              ) : (
                <></>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                colorScheme="green"
                data-testid="gallery-add-btn"
              >
                Unggah
              </Button>
              <IconButton type="button" onClick={() => onClose()}>
                <RiCloseLine />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </UniversalPortal>
  ) : (
    <></>
  );
};

export default GalleryAddModal;
