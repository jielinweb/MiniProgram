import { HTTP } from "../utils/http.js"

class LikeModel extends HTTP {
  // 传递三个值,分别是url, id, type
  like (favorite, artID, category) {
    let url = favorite == "like" ? "like" : "like/cancel";
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artID,
        type: category
      }
    });
  }

  // 发送请求
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export { LikeModel }