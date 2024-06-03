import axios from "axios";

export const host =
  "https://aws.markcoders.com/figma-plugin/Timelapse-Backend-main";
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN1YiI6bnVsbCwiX2lkIjoiNjVkNWMwOGRkYTg3MTRlMTk0NzEyZTQzIiwiZmlyc3RfbmFtZSI6ImF5aWhhbiIsImxhc3RfbmFtZSI6InRlc3QiLCJlbWFpbCI6Im1jQGdtYWlsLmNvbSIsInN0YXRlIjowLCJyb2xlIjoxLCJpc192ZXJpZmllZCI6dHJ1ZSwiaXNfZGVsZXRlZCI6ZmFsc2UsIl9fdiI6MCwiY3VzdG9tZXJfaWQiOiJjdXNfUGJPbVRRWHoxcHp3aUsiLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0yMVQwOToyMToxNy4wMDBaIiwiaW1hZ2UiOiJodHRwczovL2ZpZ21hLXBsdWdpbi1kZXYuczMuYW1hem9uYXdzLmNvbS9rZW5ueWtlbm5ldGhoX3Rfc2hpcnRfZGVzaWduX2Zyb21fZG9uX2VkX2hhcmR5X29uX3doaXRlX2JhY2tncm9fZDg4MzhjM2YtNTQ1Mi00MjMwLWJlMWEtZWJhYTNiOTI1OWE4LnBuZyJ9LCJpYXQiOjE3MTc0MjY2NzEsImV4cCI6MTcyMjYxMDY3MX0.xmjNLZBFMesnDNnLrkSyPPPnFOpyvpnjAH66luJEpxk"


export const Get = async(endpoint, params = {}) => {
  try {
    const response = await axios(
        {
            method:"get",
            url:host+endpoint,
            headers:{
                Authorization:`Bearer ${token}`
            },
            params
        }
    )
    return response?.data

  } catch (err) {
    return err;
  }
};
