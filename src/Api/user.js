import axios from "axios";

const userRegisterApi = async (data) => {
  try {
    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/create`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const verifyEmailApi = async (token) => {
  try {
    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/verifyEmail/${token}`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userUpdateApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/users`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const memberCheckApi = async (data, token) => {
  try {
    const AUTH_TOKEN = token;
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/users`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userlistApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const loginApi = async (data) => {
  try {
    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/signin`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const forgotPassApi = async (data) => {
  try {
    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/forgotPassword`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const inviteMemberApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/inviteMember`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const getInviteMemberApi = async (page) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/invitedMembers`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getFilterInviteMemberApi = async (search, status, role, module) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/invitedMembers?searchText=${search}&status=${status}&role=${role}&module=${module}`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const verifyOtpApi = async (data) => {
  try {
    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/verifyForgotPasswordCode`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const updatePassApi = async (data, token) => {
  try {
    const AUTH_TOKEN = token;
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/updatePassword`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const resetPassApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/resetPassword`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userUpdateByIdApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const companyDetailApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/company`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const updateCompanyDetailApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/company`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userImageUploadApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/upload-image`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userImageGetApi = async (imageName) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/upload-image/${imageName}`,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export {
  userRegisterApi,
  verifyEmailApi,
  userUpdateApi,
  userlistApi,
  loginApi,
  forgotPassApi,
  verifyOtpApi,
  updatePassApi,
  resetPassApi,
  inviteMemberApi,
  memberCheckApi,
  getInviteMemberApi,
  userUpdateByIdApi,
  companyDetailApi,
  updateCompanyDetailApi,
  getFilterInviteMemberApi,
  userImageUploadApi,
  userImageGetApi
};
