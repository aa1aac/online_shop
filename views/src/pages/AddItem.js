import { useForm } from "react-hook-form";

const AddItem = () => {
  const { register, handleSubmit, formState } = useForm();

  const uploadItem = (formData) => {
    console.log(formData);
  };
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
                type="file"
                className={
                  formState.errors.images
                    ? "is-invalid form-control"
                    : "form-control"
                }
                id="Images"
                multiple
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
