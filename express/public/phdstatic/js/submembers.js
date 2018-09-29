/*
{
  "members": [
    {
      "mid": "string",
      "account": "string",
      "pws": "string",
      "name": "string",
      "description": "string",
      "group": "string",
      "permission": "string",
      "steps": [
        {
          "sid": "string",
          "group": "string",
          "title": "string",
          "deadline": "string",
          "log": "string",
          "status": true
        }
      ],
      "alert": true,
      "hidden": true
    }
  ]
}
*/

class member {
  constructor(mid,name,group,permission,steps,hidden,description) {
    this.mid = mid;
    this.name = name;
    this.description = JSON.parse(description);
    this.group = group;
    this.permission = permission;
    this.steps = steps;
    this.hidden = hidden;
  }
}

class step {
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



var step1_1 = new step("s4","NCU-NLT","title4","2019-12-31","4",0,"description1");
var step1_2 = new step("s5","NCU-NLT","title5","2019-12-31","5",1,"description2");
var step1_3 = new step("s6","NCU-NLT","title6","2019-12-31","6",null,"description3");
var step2 = new step("s2","NCU-NLT","title2","2019-12-31","None",1,"description4");
var step3 = new step("s3","NCU-NLT","title3","2019-12-31","None",0,"description5");
var member1 = new member("m1","Tony","NCU-NLT","user",[step1_1,step2,step3],false,"{\"入學年\":\"2018\",\"學號\":\"106524018\",\"聯絡方式\":\"DemoStudent1@mail.com\"}");
var member2 = new member("m2","Gavin","NCU-NLT","user",[step1_2,step2,step3],false,"{\"入學年\":\"2018\",\"學號\":\"106524019\",\"聯絡方式\":\"DemoStudent2@mail.com\"}");
var member3 = new member("m3","Theta","NCU-NLT","user",[step1_3,step2,step3],false,"{\"入學年\":\"2018\",\"學號\":\"106524020\",\"聯絡方式\":\"DemoStudent3@mail.com\"}");


var Demosubmembers= {
  "members": [member1,member2,member3]
};
//inputsubmembers(Demosubmembers);
function inputsubmembers(input_submembers){
  for(var idx in input_submembers["members"]){
    const m = input_submembers["members"][idx];
    $.cookie(m.name, JSON.stringify(m), { expires: 1 });
    addmembertolist(m);
  }
}







//$("#members").append(" <b>Hello world!</b>");
/* a member
<div class="media align-items-center text-muted pt-3">
  <i class="fas fa-user p-3 "></i>
  <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
    <strong class="d-block text-right">
      <i class="fas fa-exclamation p-1 text-red "></i>
      <i class="fas fa-plus p-1"></i>
      <i class="fas fa-times p-1"></i>
    </strong>
    <strong class="d-block text-black">Tony</strong>
      <br>
      入學年:2018<br/>
      學號：106524018<br/>
      聯絡方式：DemoStudent@mail.com<br/>
  </p>

</div>
*/
function addmembertolist(member){
  const unitdiv = 'unitdiv_'+member.mid;
  const unitp = 'unitp_'+member.mid;
  const uniticon = 'uniticon_'+member.mid;
  const unitinfo = 'unitinfo_'+member.mid;
  //console.log(member);
  if(!member.hidden){
    $("#members").append('<div id="'+unitdiv+'" class="media align-items-center text-muted pt-3 likebutton btn btn-default" onclick="showsteps(\''+member.name+'\')">');
  }else{
    $("#members").append('<div id="'+unitdiv+'" class="d-none media align-items-center text-muted pt-3 likebutton btn btn-default" onclick="showsteps(\''+member.name+'\')">');
  }

  $("#"+unitdiv).append('<i class="adv fas fa-edit p-3" onclick=\'editMember("'+member.mid+'","'+member.name+'","'+JSON.stringify(member.description).replace(/"/g,"\\\"")+'");\'></i>');
  $("#"+unitdiv).append('<p id="'+unitp+'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">');
  $("#"+unitp).append('<strong id="'+uniticon+'" class="d-block text-right">');
  $("#"+uniticon).append('<i class="fas fa-exclamation p-1 text-red d-none"></i>');
  //$("#"+uniticon).append('<i class="adv fas fa-edit p-1"></i>');
  $("#"+uniticon).append('<i class="adv fas fa-times p-1 " onclick="deleteMemberStartUp(\'你想要刪除成員： '+member.name+' 嗎？\',\''+member.mid+'\');"></i>');
  $("#"+uniticon).append('<i class=" fas fa-arrow-right p-1"></i>');
  $("#"+unitp).append('<strong class="d-block text-black text-left">'+member.name+'</strong>');
  $("#"+unitp).append('<div id="'+unitinfo+'" class="d-block text-black text-left">');
  $("#"+unitinfo).append('<br>');
  //$("#"+unitinfo).append('入學年:2018<br/>');
  //$("#"+unitinfo).append('學號：106524018<br/>');
  //$("#"+unitinfo).append('聯絡方式：DemoStudent@mail.com<br/>');
  $("#"+unitinfo).append('<p class="adv my-0">account : '+member.account+'</p>');
  $("#"+unitinfo).append('<p class="adv my-0">pws : '+member.pws+'</p>');
  for (var key in member.description){
    //console.log(key);
    $("#"+unitinfo).append(key+' : '+member.description[key]+'<br/>');
  }


}
