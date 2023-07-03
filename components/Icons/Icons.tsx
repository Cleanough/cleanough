export function HamburgerIcon() {
    return (
        <>
            <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
            <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </>
    );
}

export function NotificationIcon() {
    return (
        <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
        </svg>
    );
}

export function RightArrowIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" />
        </svg>
    );
}

export function LeftArrowIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
        </svg>
    );
}

export function DoneIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
        >
            <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
        </svg>
    );
}

export function CodeIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M320-242 80-482l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z" />
        </svg>
    );
}

export function ThumbUpIcon({
    dark,
    filled
}: {
    dark: boolean;
    filled: boolean;
}) {
    return (
        <>
            {filled ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="M314-120q-25 0-42.5-17.5T254-180v-428q0-11 4.5-22t12.5-19l207-218q14-14 33.5-17t36.5 7q17 10 25.5 28t4.5 37l-38 180h320q23 0 41.5 18.5T920-572v82q0 11-2.5 25.5T910-439L794-171q-9 21-29.5 36T721-120H314Zm-177 0q-23 0-40-17t-17-40v-398q0-23 17-40t40-17q23 0 40 17t17 40v398q0 23-17 40t-40 17Z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="M716-120H272v-512l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79v-512h193Z" />
                </svg>
            )}
        </>
    );
}

export function ThumbDownIcon({
    dark,
    filled
}: {
    dark: boolean;
    filled: boolean;
}) {
    return (
        <>
            {filled ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="M100-328q-23 0-41.5-18.5T40-388v-82q0-11 2.5-25.5T50-521l116-268q9-21 29.5-36t43.5-15h407q25 0 42.5 17.5T706-780v428q0 11-4.5 22T689-311L482-93q-14 14-33.5 17T412-83q-17-10-25.5-28t-4.5-37l38-180H100Zm723-512q23 0 40 17t17 40v398q0 23-17 40t-40 17q-23 0-40-17t-17-40v-398q0-23 17-40t40-17Z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z" />
                </svg>
            )}
        </>
    );
}

export function CommentIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M240-400h480v-60H240v60Zm0-130h480v-60H240v60Zm0-130h480v-60H240v60ZM880-80 720-240H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v740ZM140-300v-520 520Zm606 0 74 80v-600H140v520h606Z" />
        </svg>
    );
}

export function FullScreenIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z" />
        </svg>
    );
}

export function FullScreenExitIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z" />
        </svg>
    );
}

export function DarkModeIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z" />
        </svg>
    );
}

export function LightModeIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M479.765-340Q538-340 579-380.765q41-40.764 41-99Q620-538 579.235-579q-40.764-41-99-41Q422-620 381-579.235q-41 40.764-41 99Q340-422 380.765-381q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170-450H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450H790ZM479.825-760Q467-760 458.5-768.625T450-790v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720Q467-40 458.5-48.625T450-70v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-170v100q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM240-678l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217-786 226-777l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5-282q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743-174 734-183Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786-743 777-734l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897-182.897q-8.897-8.896-8.897-21.5Q174-217 183-226l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291-273 291-261t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480-480Z" />
        </svg>
    );
}

export function LinkIcon({ dark }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.333 0-99.167 40.765-40.833 40.764-40.833 99Q140-422 180.833-381q40.834 41 99.167 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.333 0 99.167-40.765 40.833-40.764 40.833-99Q820-538 779.167-579 738.333-620 680-620H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z" />
        </svg>
    );
}

export function SaveIcon({ dark, filled }: { dark: boolean; filled: boolean }) {
    return (
        <>
            {filled ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="m480-240-196 84q-30 13-57-5t-27-50v-574q0-24 18-42t42-18h440q24 0 42 18t18 42v574q0 32-27 50t-57 5l-196-84Z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill={dark ? "white" : ""}
                >
                    <path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z" />
                </svg>
            )}
        </>
    );
}

export function DeleteIcon({ dark }: { dark: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
        </svg>
    );
}

export function DiffActiveIcon({ dark }: { dark: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M528-120v-170q-19-63-66.5-97T357-421q-23 0-45 3t-38 8l90 90-42 42-162-162 162-162 42 42-90 90q19-5 41-8t38-3q62 0 103.5 21t71.5 54v-320l-90 90-42-42 162-162 162 162-42 42-90-90v606h-60Z" />
        </svg>
    );
}

export function DiffExitIcon({ dark }: { dark: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            fill={dark ? "white" : ""}
        >
            <path d="M448-120v-267q-33 45-84.5 88.5T248-221l-42-42q62-37 107.5-72.5t75.5-73q30-37.5 44.5-79T448-580v-146l-90 90-42-42 162-162 162 162-42 42-90-90v606h-60Z" />
        </svg>
    );
}

export function EditIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
        >
            <path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" />
        </svg>
    );
}

export default function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
        >
            <path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" />
        </svg>
    );
}

export function SpinnerIcon() {
    return (
        <div role="status">
            <svg
                aria-hidden="true"
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
