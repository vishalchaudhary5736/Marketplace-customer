import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  getS3Url,
  userNameExtractFirstLetter,
} from "../../utils/commonFunctions";
import { Camera, ChevronDown, Phone, Shield } from "lucide-react";
import { useRef, useState } from "react";
import { TextField } from "../../components/TextField";
import { SelectField } from "../../components/SelectField";
import { GENDER } from "../../constants/constant";
import { COUNTRY_CODES } from "../../constants/countryCode";
import { Button } from "../../components/Button";
import { usePreSignedUrlMutation } from "../../services/userApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updateSchema, type updateProfileFormValues } from "../../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";

export function EditProfile() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const userIdentifier = userNameExtractFirstLetter(
    userDetail?.firstName,
    userDetail?.lastName,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      firstName: userDetail?.firstName ?? "",
      lastName: userDetail?.lastName ?? "",
      dob: userDetail?.dob?.slice(0, 10) ?? "",
      gender: userDetail?.gender ?? "",
      avatarUrl: userDetail?.avatarUrl ?? "",
    },
    mode: "onTouched", // validates a field when the user leaves it: good UX
  });

  const [preSignedUrl] = usePreSignedUrlMutation();
  const avatarUrl = watch("avatarUrl");
  console.log("avatarUrl=======", avatarUrl);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      if (!["image/png", "image/jpeg"].includes(file.type))
        return toast.error("Only JPG or PNG");
      if (file.size > 5 * 1024 * 1024) return toast.error("Max 5 MB");

      const fileId = crypto.randomUUID();

      const { data } = await preSignedUrl({
        folder: "profile",
        files: [
          {
            fileId: fileId,
            fileName: file.name,
            contentType: file.type,
            fileSize: file.size,
          },
        ],
      }).unwrap();

      const { uploadUrl, key } = data.uploadUrls[0];

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      setValue("avatarUrl", key, { shouldDirty: true, shouldValidate: true });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Could not upload photo");
    }
  };

  const [countryCode, setCountryCode] = useState(
    userDetail?.countryCode ?? "+91",
  );
  const [mobile, setMobile] = useState(userDetail?.mobileNumber ?? "");

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

          <form noValidate className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="relative flex h-22 w-22 shrink-0 items-center justify-center rounded-full bg-[#F7E1D5]">
                {avatarUrl ? (
                  <img src={getS3Url(avatarUrl)} />
                ) : (
                  <p className="text-[28px] text-brand">{userIdentifier}</p>
                )}
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
                    onChange={handleFileUpload}
                    accept="image/png,image/jpeg,image/jpg"
                  />
                  <button
                    type="button"
                    className="text-brand font-semibold cursor-pointer hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <span>JPG or PNG, up to 5 MB. *</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <TextField
                label="First Name *"
                placeholder="Vishal"
                value={userDetail?.firstName}
              />
              <TextField
                label="Last Name"
                placeholder="Chaudhary"
                value={userDetail?.lastName ?? ""}
              />
              <TextField
                label="Date of birth *"
                value={userDetail?.dob ? userDetail.dob.slice(0, 10) : ""}
                type="date"
                placeholder="DD / MM / YYYY"
                inputMode="numeric"
                maxLength={14}
              />
              <SelectField
                label="Gender *"
                value={userDetail?.gender ?? ""}
                options={GENDER}
              />
              <div className="flex flex-col gap-2">
                <label key="email">Email address</label>
                <div className="flex gap-2 items-center justify-between h-12 rounded-lg border border-line bg-white px-3.5 outline-none focus:ring-2 focus:ring-brand/40">
                  <div className="flex flex-1 min-w-0 items-center gap-2">
                    <input
                      className=" bg-transparent outline-none"
                      type="text"
                      id="email"
                      value={userDetail?.email}
                      placeholder="vishalchaudhary@gmail.com"
                    />
                    {userDetail?.isEmailVerified ? (
                      <p className="shrink-0 py-0.5 px-2 text-[#166534] text-[12px] bg-[#DCFCE7] rounded-[999px]">
                        Verified
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="shrink-0 cursor-pointer rounded-full bg-amber-50 px-2 py-0.5 text-[12px] font-medium text-amber-700"
                      >
                        Not verified
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-[14px] hover:underline text-brand cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mobile" className="text-sm font-medium">
                  Phone number
                </label>
                <div
                  className="group flex h-12 items-stretch overflow-hidden rounded-lg border border-line bg-white shadow-sm
                    transition-all duration-150 hover:border-brand/60
                    focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15"
                >
                  <div className="relative flex items-center border-r border-line bg-stone-50">
                    <select
                      aria-label="Country code"
                      autoComplete="tel-country-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="h-full cursor-pointer appearance-none bg-transparent pl-3 pr-8 text-[15px] font-medium text-stone-900 outline-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-2.5 text-muted"
                    />
                  </div>

                  <div className="flex flex-1 min-w-0 items-center gap-2 px-3">
                    <Phone
                      size={16}
                      className="shrink-0 text-muted group-focus-within:text-brand"
                    />
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="79730XXXXX"
                      className="w-full min-w-0 bg-transparent text-[15px] tracking-wide text-stone-900 outline-none placeholder:text-muted"
                    />
                    {userDetail?.isMobileVerified ? (
                      <span className="shrink-0 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[12px] font-medium text-[#166534]">
                        ✓ Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="shrink-0 cursor-pointer rounded-full bg-amber-50 px-2 py-0.5 text-[12px] font-medium text-amber-700"
                      >
                        Not verified
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    className="shrink-0 px-3.5 text-[14px]  text-brand hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
            <span className="inline-flex gap-2 items-center bg-[rgb(250,247,242)] text-[rgb(87,83,78)] rounded-[10px] py-3 px-3.5">
              <Shield className="w-4 h-4" />
              Email and phone number are used to sign in, so they're changed
              separately with a verification code.
            </span>
            <div className="border-t border-[#F0EEEC]  pt-1.5">
              <div className="flex gap-2.5 mt-4">
                <Button type="submit" className="max-w-36">
                  Save changes
                </Button>
                <Button type="button" className="max-w-28" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
