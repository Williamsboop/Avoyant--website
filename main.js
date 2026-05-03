import { startSplash } from "./scripts/splash.js";
import { startLoadingDots } from "./scripts/loading_dots.js";
import { findLocal } from "./scripts/instance_check.js";
import {setFavicon} from "./scripts/favicon.js";
import { contentIsEmpty } from "./scripts/emptyContent.js";
import { createNav } from "./scripts/createNav.js";
import { createFooter } from "./scripts/createFooter.js";

setFavicon();
createNav();
createFooter();
startSplash();
startLoadingDots();
findLocal();
contentIsEmpty();