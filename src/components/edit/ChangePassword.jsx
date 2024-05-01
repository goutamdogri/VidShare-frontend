import { useEffect, useState } from "react";
import apiRequest from "../../hooks/apiRequest";
import { useParams } from "react-router-dom";
import useCheckValidForEdit from "../../hooks/useCheckValidForEdit";

function ChangePassword() {
  const { channelId } = useParams();
  const isValid = useCheckValidForEdit(channelId);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ifEqualcurrentPassword, setIfEqualCurrentPassword] = useState(false);
  const [ifEqualConfirmPassword, setIfEqualConfirmPassword] = useState(false);

  async function handleSubmit() {
    if (newPassword === confirmPassword && newPassword !== currentPassword) {
      const info = {
        oldPassword: currentPassword,
        newPassword: newPassword,
      };
      try {
        await apiRequest(
          "/users/change-password",
          "POST",
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

  async function handleCancel() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  useEffect(() => {
    if (currentPassword === "") {
      setIfEqualCurrentPassword(false);
    } else {
      if (currentPassword == newPassword) {
        setIfEqualCurrentPassword(true);
      } else {
        setIfEqualCurrentPassword(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword == newPassword) {
      setIfEqualConfirmPassword(false);
    } else {
      setIfEqualConfirmPassword(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  if (isValid) {
    return (
      <div className="px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <h5 className="font-semibold">Password</h5>
            <p className="text-gray-300">
              Please enter your current password to change your password.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-2/3">
            <div className="rounded-lg border">
              <div className="flex flex-wrap gap-y-4 p-4">
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="old-pwd">
                    Current password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="old-pwd"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="new-pwd">
                    New password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="new-pwd"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <p className="mt-0.5 text-sm text-gray-300">
                    Your new password must be more than 8 characters.
                  </p>
                </div>
                <div className="w-full">
                  <label className="mb-1 inline-block" htmlFor="cnfrm-pwd">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                    id="cnfrm-pwd"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <hr className="border border-gray-300" />
              <div className="flex items-center justify-end gap-4 p-4">
                <div>
                  {ifEqualcurrentPassword && (
                    <p className="text-red-500">
                      current password and new password can not be same
                    </p>
                  )}
                  {ifEqualConfirmPassword && (
                    <p className="text-red-500">
                      new password and confirm password should be same
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCancel}
                  className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
