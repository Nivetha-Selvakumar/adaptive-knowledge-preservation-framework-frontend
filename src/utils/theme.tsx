// src/utils/theme.ts

import darkFavicon from "../assets/images/darkFavicon.png";
import lightFavicon from "../assets/images/lightFavicon.png";

export const changeFavicon = (theme: "light" | "dark") => {
    const favicon = document.getElementById(
        "app-favicon"
    ) as HTMLLinkElement;

    if (!favicon) return;

    favicon.href =
        theme === "dark"
            ? darkFavicon
            : lightFavicon;
};