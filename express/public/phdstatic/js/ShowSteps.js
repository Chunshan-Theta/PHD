/* a step
<div id="container" class="border-bottom border-black">
    <div class="media text-muted pt-3 row">
      <div class="col-md-4 p-3 my-1">Final Exam </div>
      <div class="col-md-6 p-3 my-1">has two chance. you need passing the exam before graduation.</div>
      <div class="col-md-2 p-3 my-1"><i class="fas fa-check text-green"></i></div>
    </div>
    <div class="pt-3 p-3 bg-lightgray ">
        <li class="text-right "><i class="fas pl-3 fa-edit" title="編輯"></i></li>
        <li>第一次測試結果 未通過，原因分數未達標準</li>
        <li>第二次測試結果 通過，恭喜～～～～</li>
        <li class="text-right text-gray">deadline:2022/09/22</li>
    </div>
</div>
*/


function showsteps(name){
  $("#addstep").off("click");
  $.cookie('chosenmember', name, { expires: 1 });
  $("#addstep").attr("onclick",'newastep(\''+name+'\');');
  //$("#addstep").addClass("xzc");

  $("#stepslistcontent").remove();
  const m = JSON.parse(MemberListDetailData[name]);
  console.log(m);
  $("#addstep").attr("onclick",'newastep(\''+m.mid+'\');');

  $("#stepslist").append('<div id="stepslistcontent">');
  //console.log(m.steps);

  for(var idx in m.steps){
    addasteptodiv(m.steps[idx]);
  }
  window.scrollTo(0, 0);

}
function addasteptodiv(step){
  const containername = "container_"+step.sid;
  const containerinfo = "info_"+step.sid;
  const containerlog = "log_"+step.sid;

  $("#stepslistcontent").append('<div id="'+containername+'" class="border-bottom border-black ">');
  $("#"+containername).append('<div id="'+containerinfo+'" class="media text-muted pt-3 row btn btn-default likebutton" onclick="showlog(\''+containerlog+'\')">');
  $("#"+containername).append('<div id="'+containerlog+'" class="pt-3 p-3 bg-lightgray d-none ">');

  $("#"+containerinfo).append('<div class="col-md-3 p-3 my-1 text-in-div">'+step.title+' </div>');
  $("#"+containerinfo).append('<div class="col-md-5 p-3 my-1 text-in-div">'+step.description+'</div>');
  if(step.status == true){
    $("#"+containerinfo).append('<div class="col-md-4 p-3 my-1"><i class="fas fa-check text-green text-center"><br>completed!<br></i></div>');
  }else if (step.status == false) {
    $("#"+containerinfo).append('<div class="col-md-4 p-3 my-1"><i class="fas fa-times text-red text-center"><br>fail!<br></i></div>');
  }else{
    $("#"+containerinfo).append('<div class="col-md-4 p-3 my-1"><i class="fas fa-question-circle text-red text-center"></i></div>');
  }
    //$("#"+containerinfo).append('<div class="col-md-1 p-3 my-1"><i class="fas fa-arrow-down text-gray"></i></div>');

  $("#"+containerlog).append('<li class="text-right adv"><i class="fas pl-3 fa-edit adv" title="編輯" onclick=\'editTheStep(\"'+step.sid+'\",\"'+step.title+'\",\"'+step.description+'\",\"'+step.status+'\",\"'+step.log+'\",\"'+step.deadline+'\");\'></i><i class="fas pl-3 fa-times adv" title="刪除" onclick="deleteStepStartUp(\'你想要刪除任務： '+step.title+' 嗎？\',\''+step.sid+'\');"></i></li>');
  $("#"+containerlog).append('<li class="text-in-div">'+step.log+'</li>');
  $("#"+containerlog).append('<li class="text-right text-gray">deadline:'+step.deadline+'</li>');


}
function showlog(nameid){
  //console.log(nameid);
  if($("#"+nameid).hasClass("d-none")){
    $("#"+nameid).removeClass("d-none");
  }else{
    $("#"+nameid).addClass("d-none");
  }

}