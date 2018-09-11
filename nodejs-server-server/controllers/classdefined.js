module.exports.member = class member {
  constructor(mid,name,group,permission,steps,hidden,description) {
    this.mid = mid;
    this.name = name;
    this.description = JSON.parse(description);
    this.group = group;
    this.permission = permission;
    this.steps = steps;
    this.hidden = hidden;
    this.pws = "deny";
    this.account = "deny";
    this.alert = null;
  }
}


module.exports.step = class step {
  constructor(sid,group,title,deadline,log,status,description) {
    this.sid = sid;
    this.group = group;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.log = log;
    this.status = status;
  }
}
