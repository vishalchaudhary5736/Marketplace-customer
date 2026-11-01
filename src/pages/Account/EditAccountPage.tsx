import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { userNameExtractFirstLetter } from "../../utils/commonFunctions";
import { Camera } from "lucide-react";
import { useRef } from "react";
import { TextField } from "../../components/TextField";
import { SelectField } from "../../components/SelectField";
import { GENDER } from "../../constants/constant";

export function EditProfile() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const userIdentifier = userNameExtractFirstLetter(
    userDetail?.firstName,
    userDetail?.lastName,
  );

  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col ">
          <h1 className="text-[32px] text-[rgb(28,25,23)] font-semibold">
            Personal information
          </h1>
          <p className="text-[15px] text-[rgb(87,83,78)]">
            Manage your profile and contact details
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-white px-6 py-5 rounded-2xl mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[rgb(28,25,23)] font-extrabold text-[20px]">
                Edit basic information
              </h1>
              <p className="text-[14px] text-[rgb(87,83,78)]">
                Field marked * are required
              </p>
            </div>
          </div>

          <form noValidate>
            <div className="flex items-center gap-4">
              <div className="relative flex h-22 w-22 shrink-0 items-center justify-center rounded-full bg-[#F7E1D5]">
                <p className="text-[28px] text-brand">{userIdentifier}</p>
              </div>
              <div className="flex flex-col gap-2 text-[13px] text-[rgb(87,83,78)]">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="cursor-pointer inline-flex gap-2 items-center border rounded-xl py-2 px-3 text-[15px] font-semibold text-[rgb(28,25,23)] border-[rgb(214,211,206)]"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Camera className="w-4 h-4" />
                    Upload photo
                  </button>
                  <input
                    className="hidden"
                    ref={fileRef}
                    type="file"
                    accept="image/png"
                  />
                  <button
                    type="button"
                    className="text-brand font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <span>JPG or PNG, up to 2 MB.</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <TextField label="First Name *" placeholder="Vishal" />
              <TextField label="Last Name" placeholder="Chaudhary" />
              <TextField
                label="Date of birth"
                type="date"
                placeholder="DD / MM / YYYY"
                inputMode="numeric"
                maxLength={14}
              />
              <SelectField label="Gender" options={GENDER} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
