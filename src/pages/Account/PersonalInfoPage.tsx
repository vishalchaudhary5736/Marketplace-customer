import { Camera, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  formatDate,
  getS3Url,
  userNameExtractFirstLetter,
} from "../../utils/commonFunctions";
import { Link } from "react-router-dom";

export function PersonalInfo() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const userIdentifier = userNameExtractFirstLetter(
    userDetail?.firstName,
    userDetail?.lastName,
  );

  const avatar = getS3Url(userDetail?.avatarUrl);
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
                Basic information
              </h1>
              <p className="text-[14px] text-[rgb(87,83,78)]">
                Used on your orders and invoices
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-33.5 h-10 gap-2 px-4 text-brand text-[14px] bg-[#FFFFFF] border border-[#E7C3AE] rounded-[10px]">
              <Pencil className="h-4 w-4" />
              <Link
                to="/account/edit"
                className="text-sm font-semibold cursor-pointer"
              >
                Edit details
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex h-22 w-22 shrink-0 items-center justify-center rounded-full bg-[#F7E1D5]">
              {/* <User className="h-12 w-12 text-[rgb(180,68,27)]" /> */}
              {avatar ? (
                <img src={avatar} />
              ) : (
                <p className="text-[28px] text-brand">{userIdentifier}</p>
              )}

              <button
                type="button"
                className="absolute right-0 bottom-0 h-7 w-7 bg-[#2a2828] cursor-pointer rounded-full flex items-center justify-center text-white"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col text-[13px] text-[rgb(87,83,78)]">
              <span>JPG or PNG, up to 2 MB.</span>
              <span>A clear photo helps delivery partners recognise you.</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-[1fr_2fr] border-t text-[15px] text-[rgb(87,83,78)] border-[#F0EEEC]">
              <p className="py-2  ">Full name</p>
              <p className="py-2 text-[15px] text-[rgb(28,25,23)]">
                {userDetail?.lastName
                  ? `${userDetail.firstName} ${userDetail.lastName}`
                  : userDetail?.firstName}
              </p>
            </div>
            <div className="grid grid-cols-[1fr_2fr] text-[15px] border-t text-[rgb(87,83,78)] border-[#F0EEEC]">
              <p className="py-2 ">Email address</p>
              <div className="flex justify-between gap-2">
                <div className="py-2 text-[15px] text-[rgb(28,25,23)] inline-flex gap-2">
                  <span>{userDetail?.email}</span>
                  {userDetail?.isEmailVerified ? (
                    <p className="py-0.5 px-2 text-[#166534] text-[12px] bg-[#DCFCE7] rounded-[999px]">
                      Verified
                    </p>
                  ) : (
                    <p>Not verified</p>
                  )}
                </div>
                <button className="text-[14px] underline text-brand">
                  Change
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] border-t text-[15px] text-[rgb(87,83,78)] border-[#F0EEEC]">
              <p className="py-2 ">Phone number</p>
              <div className="flex justify-between gap-2">
                <div className="py-2 text-[15px] text-[rgb(28,25,23)] inline-flex gap-2">
                  {userDetail?.countryCode ? (
                    <span className="py-2 text-[15px] text-[rgb(28,25,23)]">
                      {userDetail.countryCode} {userDetail.mobileNumber}
                    </span>
                  ) : (
                    <span className="py-2 font-semibold">Not added</span>
                  )}
                  {userDetail?.countryCode &&
                    (userDetail.isMobileVerified ? (
                      <span className="self-center py-0.5 px-2 text-[12px] text-[#166534] bg-[#DCFCE7] rounded-full">
                        Verified
                      </span>
                    ) : (
                      <span className="self-center py-0.5 px-2 text-[12px] text-[#92400E] bg-[#FEF3C7] rounded-full">
                        Not verified
                      </span>
                    ))}
                </div>
                {!userDetail?.countryCode ? (
                  <button className="text-[14px] underline text-brand">
                    Add
                  </button>
                ) : (
                  !userDetail.isMobileVerified && (
                    <button className="text-[14px] underline text-brand">
                      Verify now
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] border-t text-[15px] text-[rgb(87,83,78)] border-[#F0EEEC]">
              <p className="py-2 ">Date of birth</p>
              {userDetail?.dob ? (
                <p className="py-2 text-[15px] text-[rgb(28,25,23)]">
                  {userDetail.dob}
                </p>
              ) : (
                <p className="py-2 text-[#8e8a8a]">Not added</p>
              )}
            </div>
            <div className="grid grid-cols-[1fr_2fr] border-t text-[15px] text-[rgb(87,83,78)] border-[#F0EEEC]">
              <p className="py-2 ">Gender</p>
              {userDetail?.gender ? (
                <p className="py-2 text-[15px] text-[rgb(28,25,23)]">
                  {userDetail.gender}
                </p>
              ) : (
                <p className="py-2 text-[#9b9696]">Not added</p>
              )}
            </div>
            <div className="grid grid-cols-[1fr_2fr] border-t border-[#F0EEEC] text-[rgb(87,83,78)] text-[15px] ">
              <p className="py-2 ">Registered on</p>
              <p className="py-2 text-[15px] text-[rgb(28,25,23)]">
                {formatDate(userDetail?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
