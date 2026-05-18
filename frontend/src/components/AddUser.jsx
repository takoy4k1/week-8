import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

const USERS_STORAGE_KEY = "user-management.users";

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const today = new Date().toISOString().split("T")[0];
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  //form submit
  const onUserCreate = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // If backend is configured, use API. Otherwise use localStorage.
      if (apiUrl) {
        let res = await fetch(`${apiUrl}/user-api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (res.status === 201) {
          navigate("/userslist");
          return;
        }

        console.log(res);
        throw new Error("Error in creating user");
      }

      const users = getStoredUsers();
      const storedUser = { ...newUser, _id: createId() };
      users.push(storedUser);
      setStoredUsers(users);
      navigate("/userslist");
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Add User</h1>
        <p className="page-subtitle">Enter details and submit the form.</p>
      </header>

      <div className="card mx-auto w-full max-w-xl">
        <form className="space-y-4" onSubmit={handleSubmit(onUserCreate)}>
          <div className="space-y-1">
            <label className="field-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="name"
              className="field-input"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="field-error">Name is required.</p>}
          </div>

          <div className="space-y-1">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="field-input"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="field-error">Email is required.</p>}
          </div>

          <div className="space-y-1">
            <label className="field-label" htmlFor="dateOfBirth">
              Date of birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="field-input"
              max={today}
              {...register("dateOfBirth", {
                required: "Date of birth is required.",
                validate: (value) =>
                  value <= today || "Date of birth cannot be in the future.",
              })}
            />
            {errors.dateOfBirth && (
              <p className="field-error">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="field-label" htmlFor="mobileNumber">
              Mobile number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9999999999"
              className="field-input"
              {...register("mobileNumber", {
                required: "Mobile number is required.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number.",
                },
              })}
            />
            {errors.mobileNumber && (
              <p className="field-error">{errors.mobileNumber.message}</p>
            )}
          </div>

          {error && (
            <p className="field-error" role="alert">
              {error.message}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full bg-color-pink-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser