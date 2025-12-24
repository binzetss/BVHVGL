import { removeVietnamese } from "./removeVietnamese";

const iconMap = {
  ungbuou: "UB.png",
  yhctphcn: "YHCT.png",
  lienchuyenkhoa: "LCK.png",
  phusan: "san.png",
  noitonghop: "noi.png",
  duoc: "Duoc.png",
  chanthuongchinhhinh: "CTCH.png",
  ngoaitonghop: "ngoai.png",
  noisoi: "noi.png",
  nhi: "nhi.png",
  dinhduong: "DinhDuong.png",
  hoisuctichcuc: "hscc.png",
  noitim: "tim.png",
  nhiemkhuan: "KSNK.png",
  chandoanhinhanh: "CDHA.png",
  gaymehoisuc: "TMH.png",
  khambenh: "Khambenh.png",
  xetnghiem: "XN.png"
};

export function getDeptIcon(deptName) {
  const key = removeVietnamese(deptName);

  for (const iconKey in iconMap) {
    if (key.includes(iconKey)) {
      return require(`../assets/ICONCHUYENKHOA/${iconMap[iconKey]}`);
    }
  }

  // fallback icon
  return require(`../assets/ICONCHUYENKHOA/115.png`);
}
