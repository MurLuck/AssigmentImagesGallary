export const getImages = async (bySearch = "", page = 1) => {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&text=${bySearch}&page=${page}&content_type=1&is_getty=1&format=json&nojsoncallback=1`;
  const response = await fetch(url);
  const data = await response.json().catch(err => err.message);
  console.log(data);

  let images = "Some error occurred, Please try again";
  if ("photos" in data)
    images = data["photos"];
  if (typeof data === "string")
    images = data;

  return images;
}
