import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate} from "react-router-dom";
import { useUsersStore } from "../../hooks/useStore";
import { USER_PROFILE_INPUTS } from "../../shared/constants/userProfilePageInputs";
import Button from "../../shared/ui/Button/Button";
import "./UserProfilePage.css";

export default function UserProfilePage(props) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const { getUser, modifyUserData } = useUsersStore();
  const { id } = useParams();
  const data = getUser(id);
  const navigate = useNavigate();
  const sbtRef = useRef(null);

  useEffect(() => {
    if (data) {
      const userData = {
        name: data.name ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        street: data.address.street ?? "",
        city: data.address.city ?? "",
        zipcode: data.address.zipcode ?? "",
        phone: data.phone ?? "",
        website: data.website ?? "",
        comment: data.comment ?? "",
      };
      reset(userData);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid, errors, isDirty },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    const newUserData = {
      ...data,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        ...data.address,
        street: formData.street,
        city: formData.city,
        zipcode: formData.zipcode,
      },
      phone: formData.phone,
      website: formData.website,
      comment: formData.comment,
    };
    console.log(newUserData);
    modifyUserData(newUserData);
    navigate("/");
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-page-top">
        <h2 className="user-profile-page__title">Профиль пользователя</h2>
        <Button
          caption="Редактировать"
          onClick={() => {
            setIsModifyMode(true);
          }}
          disabled={isModifyMode}
        />
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {USER_PROFILE_INPUTS.map((input, i) => (
          <fieldset className="fieldset" key={i}>
            <label htmlFor={input.name} className="fieldset__label">{input.label}</label>
            <input
              {...register(input.name, {
                required: true,
                disabled: !isModifyMode,
              })}
              className={`fieldset__input ${
                errors[input.name] &&
                errors[input.name].type === "required" &&
                "fieldset__input_invalid"
              }`}
              id={input.name}
              type="text"
              required
            />
          </fieldset>
        ))}
        <fieldset className="fieldset">
          <label className="fieldset__label">Comment</label>
          <textarea
            {...register("comment", {
              disabled: !isModifyMode,
            })}
            className="fieldset__textarea"
            type="text"
          />
        </fieldset>
        <input type="submit" ref={sbtRef} style={{display: "none"}} />
      </form>
      <Button
        caption="Отправить"
        type="submit"
        onClick={()=>trigger().then(isValid=>isValid && sbtRef.current.click())}
        disabled={!isModifyMode || !isValid || !isDirty}
        style={{ alignSelf: "flex-end" }}
      />
    </div>
  );
}
