export interface LinkInterface {
  linkNameId: string;
  path: string;
}

const translationPrefix = "navigationBar.link";

const navigationLinks: Array<LinkInterface> = [
  {
    linkNameId: translationPrefix + ".forPlayers",
    path: "/#forPlayersSection",
  },
  {
    linkNameId: translationPrefix + ".forTutors",
    path: "/#forTutorsSection",
  },
  {
    linkNameId: translationPrefix + ".aboutUs",
    path: "/#aboutUsSection",
  },
  {
    linkNameId: translationPrefix + ".constructor",
    path: "/constructor",
  },
  {
    linkNameId: translationPrefix + ".login",
    path: "/",
  },
];

export default navigationLinks;
