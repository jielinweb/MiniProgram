import {
  HTTP
} from '../utils/httpPromise.js'

class BookModel extends HTTP {
  getHotlist() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  // 获取书籍的详细信息
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  // 获取书籍的点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  // 获取书籍的短评信息
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // 提交短评数据
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 获取喜欢书籍的数量
  getFavoriteBook() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  // 根据id跟类型获取对应的详情
  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }

}

export {
  BookModel
}