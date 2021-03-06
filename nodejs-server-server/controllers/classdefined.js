module.exports.member = class member {
  constructor(mid,name,group,permission,hidden,description,pws = "deny",account = "deny") {
    this.mid = mid;
    this.name = name;
    this.description = JSON.parse(description);
    this.description_str = JSON.stringify(this.description);
    this.group = group;
    this.permission = permission;
    this.hidden = hidden;
    this.pws = pws;
    this.account = account;

  }
}

module.exports.submember = class submember extends this.member {
  constructor(mid,name,group,permission,steps,hidden,description,pws = "deny",account = "deny") {
    super(mid,name,group,permission,hidden,description,pws,account);
    this.steps = steps;
    this.alert = null;

  }
}

module.exports.step = class step {
  constructor(sid,group,title,deadline,log,status,description,submid,adminmid) {
    this.sid = sid;
    this.group = group;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.log = log;
    this.status = status;
    this.submid = submid;
    this.adminmid = adminmid;
  }
}
