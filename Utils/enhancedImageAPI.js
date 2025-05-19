import axios from "axios";

const API_KEY = "wxuz3e2d738zfqeix";
const BASE_URL = "https://techhk.aoscdn.com/";

export const enhancedImageAPI = async (file) => {
  //API calling and getting enhanced image url
  try {
    const taskId = await uploadImage(file);
    console.log("Image uploaded successfully, TaskID:", taskId);

    const enhancedImageData = await pullForEnhancedImage(taskId);
    console.log("Image Enhanced Data:", enhancedImageData);
    console.log(enhancedImageData);
    return enhancedImageData;
  } catch (error) {
    console.log("Error while Enhancing Image:", error.message);
  }
};

const uploadImage = async (file) => {
  //uploadImage
  // "/api/tasks/visual/scale --POST API"
  const formData = new FormData();
  formData.append("image_file", file);
  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data?.task_id) {
    throw new Error("Failed to upload Image! Task Id not found");
  }
  console.log(data);
  return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
  //fetch Enhanced Image
  //"/api/tasks/visual/scale/{task_id} -- getAPI"
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch Enhanced Image ! Image Not found");
  }
  return data.data;
};

const pullForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    console.log("Enhanced Image is Processing");
    if (retries >= 20) {
      throw new Error("Maximum tries reached please try again later");
    }

    //wait for 2 second
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return pullForEnhancedImage(taskId, retries + 1);
  }
  console.log("Enhanced Image Url:", result);
  return result;
};
//{status: 200, message: 'success', data: {…}}data: {task_id: '90b37e5c-7f34-4f57-af9a-32e3fb305d40'}message: "success"status: 200[[Prototype]]: Object
