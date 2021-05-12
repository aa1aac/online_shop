import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const AddItem = () => {
  const { register, handleSubmit, formState, setValue } = useForm();
  const [addItem, { error }] = useMutation(ADD_ITEM_MUTATION);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true);

  const uploadImage = async (URL, file) => {
    const URLS = [];

    for (let i = 0; i < file.length; i++) {
      const data = new FormData();
      data.append("file", file[i]);
      data.append("resource_type", "raw");
      data.append("upload_preset", "default-preset");
      data.append("cloud_name", "ingo");
      let res = await fetch(URL, {
        method: "post",
        mode: "cors",
        body: data,
      });

      let json = await res.json();
      let { secure_url } = await json;
      URLS.push(secure_url);
    }

    return URLS;
  };

  const uploadItem = async (formData) => {
    try {
      setLoading(true);
      setDone(false);
      const URL = "https://api.cloudinary.com/v1_1/ingo/upload";
      // upload images
      let imagesURL = await uploadImage(URL, formData.images);
      // upload cover_image
      let coverImageURL = await uploadImage(URL, formData.coverImage);
      let res = await addItem({
        variables: {
          ...formData,
          images: imagesURL,
          coverImage: coverImageURL[0],
        },
      });

      console.log(res.data.uploadItem);

      if (res.data?.uploadItem?.success) {
        setDone(true);

        setValue("itemName", "");
        setValue("description", "");
        setValue("images", "");
        setValue("price", 0);
        setValue("coverImage", "");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  console.log(error);

  return (
    <div className="container">
      <h2 className="text-center"> Add item </h2>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(uploadItem)}>
            <div className="mb-3 ">
              <label htmlFor="itemName" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className={
                  formState.errors.itemName
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="itemName"
                {...register("itemName", {
                  minLength: {
                    value: 2,
                    message: "must have a minimum length of 2",
                  },
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                })}
              />

              {formState.errors.itemName ? (
                <div className="invalid-feedback">
                  {formState.errors.itemName.message}
                </div>
              ) : null}
            </div>

            <div className="mb-3 ">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className={
                  formState.errors.price
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="Price"
                {...register("price", {
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                })}
                step=".01"
              />

              {formState.errors.price ? (
                <div className="invalid-feedback">
                  {formState.errors.price.message}
                </div>
              ) : null}
            </div>

            <div className="mb-3 ">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                type="decimal"
                className={
                  formState.errors.description
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="Description"
                {...register("description", {
                  minLength: {
                    value: 10,
                    message: "must have a minimum length of 10",
                  },
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                })}
              />

              {formState.errors.description ? (
                <div className="invalid-feedback">
                  {formState.errors.description.message}
                </div>
              ) : null}
            </div>

            <div className="mb-3 ">
              <label htmlFor="Images" className="form-label">
                Images
              </label>
              <input
                multiple
                type="file"
                className={
                  formState.errors.images
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="Images"
                {...register("images", {
                  required: {
                    value: true,
                    message: "please add images",
                  },
                  validate: (values) => {
                    for (let i = 0; i < values.length; i++) {
                      if (
                        values[i].type.includes("image") &&
                        values[i].size < 5 * 1024 * 1000
                      ) {
                        return true;
                      } else if (values[i].size > 5 * 1024 * 1000) {
                        return "Size should not be more than 5 MB";
                      } else {
                        return "we only accept images";
                      }
                    }
                  },
                })}
              />

              {formState.errors.images ? (
                <div className="invalid-feedback">
                  {formState.errors.images.message}
                </div>
              ) : null}
            </div>

            <div className="mb-3 ">
              <label htmlFor="coverImage" className="form-label">
                Cover Image
              </label>
              <input
                type="file"
                className={
                  formState.errors.coverImage
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="coverImage"
                {...register("coverImage", {
                  required: {
                    value: true,
                    message: "the cover image is required",
                  },
                  validate: (data) => {
                    if (
                      data[0].type.includes("image") &&
                      data[0].size < 5 * 1024 * 1000
                    ) {
                      return true;
                    } else if (data[0].size > 5 * 1024 * 1000) {
                      return "Size should not be more than 5 MB";
                    } else {
                      return "we only accept images";
                    }
                  },
                })}
              />

              {formState.errors.coverImage ? (
                <div className="invalid-feedback">
                  {formState.errors.coverImage.message}
                </div>
              ) : null}
            </div>

            {error ? (
              <div className="alert alert-danger">
                {" "}
                Unable to upload the item{" "}
              </div>
            ) : null}

            {done ? (
              <div className="alert alert-success">
                {" "}
                Item successfully uploaded{" "}
              </div>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ADD_ITEM_MUTATION = gql`
  mutation (
    $coverImage: String!
    $description: String!
    $images: [String]!
    $itemName: String!
    $price: Float!
  ) {
    uploadItem(
      coverImage: $coverImage
      description: $description
      images: $images
      itemName: $itemName
      price: $price
    ) {
      success
    }
  }
`;

export default AddItem;
