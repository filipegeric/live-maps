export const User = function (email, first_name, id, last_name, username) {
  this.email = email;
  this.first_name = first_name;
  this.id = id;
  this.last_name = last_name;
  this.username = username;
}

export const MyEvent = function (address, body, created_at, created_at_ts, 
                                deleted, end_at, end_at_ts, hashtag, id, 
                                image, interest, lat, long, permanent, 
                                rating, start_at, start_at_ts, title) {
  this.address = address;
  this.body = body;
  this.created_at = created_at;
  this.created_at_ts = created_at_ts;
  this.deleted = deleted;
  this.end_at = end_at;
  this.end_at_ts = end_at_ts;
  this.hashtag = hashtag;
  this.id = id;
  this.image = image;
  this.interest = interest;
  this.lat = lat;
  this.long = long;
  this.permanent = permanent;
  this.rating = rating;
  this.start_at = start_at;
  this.start_at_ts = start_at_ts;
  this.title = title;
}