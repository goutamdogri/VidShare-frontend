import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import apiRequest from "../../hooks/apiRequest.js";
import EditImageContext from "../../contexts/EditImageContext.js";
import { useParams } from "react-router-dom";
import useCheckValidForEdit from "../../hooks/useCheckValidForEdit.js";

function EditPersonalInfo() {
  const { channelId } = useParams();
  const isValid = useCheckValidForEdit(channelId);

  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ifEqual, setIfEqual] = useState(false);
  const { avatar, setAvatar, coverImage, setCoverImage } =
    useContext(EditImageContext);
  let fName = useRef("");
  let lName = useRef("");
  let temp = useRef(0);
  let prevEmail = useRef("");

  useEffect(() => {
    if (user) {
      prevEmail.current = user.email;
      for (let i = 0; i < user.fullName.length; i++) {
        if (user.fullName.charAt(i) == " ") {
          temp.current = 1;
        } else if (temp.current == 0) {
          fName.current = fName.current + user.fullName.charAt(i);
        } else if (temp.current == 1) {
          lName.current = lName.current + user.fullName.charAt(i);
        }
      }
      setFirstName(fName.current);
      setLastName(lName.current);
      setEmail(user.email);
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      firstName == fName.current &&
      lastName == lName.current &&
      email == prevEmail.current &&
      avatar == null &&
      coverImage == null
    ) {
      setIfEqual(true);
    } else {
      setIfEqual(false);
      const fullName = firstName + " " + lastName;

      const info = {
        fullName: fullName,
        email: email,
      };

      if (avatar != null) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatar);

        try {
          await apiRequest("/users/avatar", "PATCH", null, avatarFormData);
        } catch (error) {
          console.log(error);
        }
      }

      if (coverImage != null) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("coverImage", coverImage);

        try {
          await apiRequest(
            "/users/cover-image",
            "PATCH",
            null,
            coverImageFormData
          );
        } catch (error) {
          console.log(error);
        }
      }

      try {
        await apiRequest(
          "/users/update-account",
          "PATCH",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify(info)
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function cancelSubmit() {
    setFirstName(fName.current);
    setLastName(lName.current);
    setEmail(prevEmail.current);
    setAvatar(null);
    setCoverImage(null);
  }

  if (isValid) {
    return (
      <div className="px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <h5 className="font-semibold">Personal Info</h5>
            <p className="text-gray-300">
              Update your photo and personal details.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-2/3">
            <div className="rounded-lg border">
              <div className="flex flex-wrap gap-y-4 p-4">
                <div className="w-full lg:w-1/2 lg:pr-2">
                  <label htmlFor="firstname" className="mb-1 inline-block">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="firstname"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-2">
                  <label htmlFor="lastname" className="mb-1 inline-block">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="lastname"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="lastname" className="mb-1 inline-block">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                      id="lastname"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <hr className="border border-gray-300" />

              <div className="flex items-center justify-end gap-4 p-4">
                {ifEqual && (
                  <p className=" text-red-500">You need to change something</p>
                )}
                <button
                  onClick={cancelSubmit}
                  className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPersonalInfo;
