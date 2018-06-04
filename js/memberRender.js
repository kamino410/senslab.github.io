//After render the screen
$(function() {
  memberData =
  ["data/member/memberStaff.json",
   "data/member/memberResearcherVisitor.json",
   "data/member/memberDoctor.json",
   "data/member/memberM2.json",
   "data/member/memberM1.json",
   "data/member/memberB4.json"];

  var promise = Promise.resolve();

  memberData.forEach(function(memberDataInAttribute){
    (function(memberDataInAttribute) {
        promise = promise.then(function() {
            return renderMenber(memberDataInAttribute);
        });
    })(memberDataInAttribute);
  });
});

function renderMenber(memberDataInAttribute){
  return new Promise(function(fulfill, reject){
    $.getJSON(memberDataInAttribute, function(json){
      if(1){
           fulfill("Success");
      }else{
           reject("Failed");
      }
      
      json.forEach(function( members ) {
        var countByFour = 0;
        memberInfo = "";
        attribute =
          "<div class=\"row\">" +
          "</br>" +
          "</br>" +
          "<h3 class=\"headline\">" +
            members.attribute +
          "</h3>" +
          "<hr>";
        memberInfo += attribute;

        members.people.forEach(function( member ){
          if(countByFour == 4){
            row =
            "</div>"+
            "<div class=\"row\">" +
            "</br>" +
            "</br>" +
            "<hr>";
            countByFour = 0;
          }
          else{
            row = "";
          }

          /** one member needs "photo", "nameJP",
              "nameEN", "position", and "positionOther"**/
          photo =
            "<div class=\"col-md-3\" style=\"text-align: center;\">" +
            "<img src=\"" +
            member.photoPass +
            "\" class=\"img-circle\" alt=\"" +
            member.nameEN +
            "\" width=\"130\" height=\"130\">" +
            "<br />";

          if(member.link != undefined){
            nameJP =
              "<span class=\"current-lab-member-name\">" +
              "<a class=\"member-link\" href=\"" +
              member.link +
              "\" target=\"_blank\">" +
              member.nameJP +
              "</a>" +
              "<br />";
          }
          else{
            nameJP =
              "<span class=\"current-lab-member-name\">" +
              member.nameJP +
              "<br />";
          }

          nameEN =
            member.nameEN +
            "</span>" +
            "<br />";

          if(member.position != undefined){
            position =
              "<span class=\"current-lab-member-position\">" +
              member.position;
          }
          else{
            position ="<span>";
          }

          if(member.positionOther != undefined){
            positionOther =
              "<br />" +
              member.positionOther +
              "</span>" +
      		    "</div>";
          }
          else{
            positionOther =
            "</span>" +
            "</div>";
          }

          countByFour++;

          memberInfo += row + photo + nameJP + nameEN + position + positionOther;
        });
        emptyMemberForStyle = "";

        for(i = 0; i < 4 - countByFour; i++){
          emptyMemberForStyle +=
          "<div class=\"col-md-3\" style=\"text-align: center;\">" +
          "</div>";
        }

        divEnd = "</div>";

        memberInfo += emptyMemberForStyle + divEnd;
        $("#member").append(memberInfo);
      });
    });
  });
}