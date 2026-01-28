const INITIAL_FORM_DATA = {
  fullName: "",
  dob: "",
  gender: "",
  cccd: "",
  cccdDate: "",
  cccdPlace: "",

  permanentAddress: "",
  currentAddress: "",
  hometownProvince: "",
  hometownWard: "",

  birthPlace: "",
  ethnicity: "",
  religionId: "",
  maritalStatusId: "",
  childrenCount: "",
  youngestChildAge: "",

  phone: "",
  email: "",

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",

  healthStatus: "",
  height: "",
  weight: "",
  medicalHistory: "",

  degrees: [
    {
      degreeMajor: "",
      degreeLevelId: "",
      degreeInstitution: "",
      degreeStudyTypeId: "",
      graduationYear: "",
      degreeRank: "",
      files: [],
    },
  ],

  cmes: [
    {
      cmeName: "",
      cmeInstitution: "",
      cmeStudyTypeId: "",
      cmeStartDate: "",
      cmeEndDate: "",
      cmeHours: "",
      cmeIssueDate: "",
      files: [],
    },
  ],

  applyPosition: "",
  jobDetail: "",
  workExperience: "",
  professionalSkills: "",
  careerExpectation: "",

  avatar: null,
  avatarPreview: "",
  otherCertFiles: [],

  // Trạng thái tuyển dụng - mặc định là 1 (Chờ xử lý)
  idTrangThaiTuyenDung: 1,
};
