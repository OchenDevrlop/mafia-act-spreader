import Roles from "../Interfaces/Roles";

const CitizenRoles : Roles[] = [
    {
        key: 1,
        name: "شهروند",
        willWakeUp: false,
        description: "ابتدایی ترین نقش گروه شهروند است، کسی را نمی شناسد و باید سعی کند همراه بقیه شهروندان، مافیا را پیدا کند، او فقط قدرت رای گیری و صحبت کردن در روز را دارد.",
        englishName: "citizen"
    },
    {
        key: 2,
        name: "دکتر",
        willWakeUp: true,
        description: "",
        englishName: "doctor"
    },
    {
        key: 3,
        name: "کارآگاه",
        willWakeUp: false,
        description: "",
        englishName: "detective"
    },
    {
        key: 4,
        name: "کشیش",
        willWakeUp: true,
        description: "",
        englishName: "priest"
    },
    {
        key: 5,
        name: "روئین تن",
        willWakeUp: true,
        description: "",
        englishName: "armored"
    },
    {
        key: 6,
        name: "اسنایپر",
        willWakeUp: true,
        description: "",
        englishName: "sniper"
    },
    {
        key: 7,
        name: "تفنگ دار",
        willWakeUp: true,
        description: "",
        englishName: "gunner"
    },
    {
        key: 8,
        name: "کابوی",
        willWakeUp: false,
        description: "",
        englishName: "cowboy"
    },
    {
        key: 9,
        name: "فراماسون",
        willWakeUp: true,
        description: "",
        englishName: "freemason"
    },
    {
        key: 10,
        name: "قاضی",
        willWakeUp: true,
        description: "",
        englishName: "judge"
    },
    {
        key: 11,
        name: "فدایی",
        willWakeUp: false,
        description: "",
        englishName: "sacrificer"
    },
    {
        key: 12,
        name: "بمبر",
        willWakeUp: false,
        description: "",
        englishName: "bomber"
    }
]

export default CitizenRoles;