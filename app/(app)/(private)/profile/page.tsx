import {
    EditProfile,
    ChangePassword,
    DeleteProfile
} from "@/components/Profile";

export default function Page() {
    return (
        <div className="flex justify-center items-center flex-col gap-y-4 my-4">
            <EditProfile />
            <ChangePassword />
            <DeleteProfile />
        </div>
    );
}
