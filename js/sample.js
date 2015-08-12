"use strict";

var app = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','infinite-scroll'  ] );


app.config( function ( $routeProvider) {
    $routeProvider
    .when( '/home', { templateUrl: 'home.html' } )
    
    .when('/movie/:Id', { templateUrl: 'movie.html', 
                          controller: "MovieCtrl"} )
     
     .when( '/viewall', { templateUrl: 'viewall.html' } )



    .otherwise( { redirectTo: '/home' } );
    
});


app.directive('showonhoverchild',
   function() {
      return {
         link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                 element.hide();
            });
       }
   };
});


  app.directive('starRating',
  function() {
    return {
      restrict : 'A',
      template : '<ul class="rating">'
           + '  <li class="rate" ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
           + '\u2605'
           + '</li>'
           + '</ul>',
      scope : {
        ratingValue : '=',
        max : '=',
        onRatingSelected : '&'
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        
        scope.$watch('ratingValue',
          function(oldVal, newVal) {
            if (newVal) {
              updateStars();
            }
          });
      }
    };
  }
);


         
app.service('sharedProperties', function() {
    var comment = 'Write a short review';
    var newrating='Rate this film now';
    var newsmilerating=0;
    return {
        getString: function() {
            return comment;
        },
        setString: function(value) {
            comment = value;
             
        },

        getRating: function(){
      
          return newrating;

        },
        setRating: function(value){
          newrating = value;
        
        },

        getSmileRating:function(){
         
           return newsmilerating;

        },

        setSmileRating: function(value){
          newsmilerating =value;
          for(var i=1;i<=5;i++)
         { 
            
          if(i<=newsmilerating)
         {
            var y='#smile'+i;
           $(y).addClass('smiledisplay');
          }else { 
          var y='#smile'+i;
          $(y).removeClass('smiledisplay');
         }
        }
         $('#queue').removeClass("display");
         $('#p1').addClass("addcolor1");          
         $('#p3').addClass("addcolor2");
         $('#r1').addClass("addcolor2");
        } 
        
    }
});


 app.controller("myController", function($scope,$http,$modal,sharedProperties )
   { 
      $scope.images=[{id:32,src:"images/32.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                     {id:33,src:"images/33.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                     {id:34,src:"images/34.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                     {id:35,src:"images/35.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                     {id:36,src:"images/36.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                     {id:37,src:"images/37.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                     {id:38,src:"images/38.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                     {id:39,src:"images/39.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."}
                     ];

       $scope.popularmovies=[
                     {id:32,src:"images/32.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                     {id:33,src:"images/33.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                     {id:34,src:"images/34.jpg",title:"The Hunger ",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                     {id:35,src:"images/35.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                     {id:36,src:"images/36.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                     {id:37,src:"images/37.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                      ];                     
          

        $scope.genres=[{name:"Action"},
                       {name:"Adventure"},
                       {name:"Comedy"},
                       {name:"Crime"},
                       {name:"Disaster"},
                       {name:"Documentary"},
                       {name:"Drama"},
                       {name:"Eastern"},
                       {name:"Familys"},
                       {name:"Fantasy"},
                       {name:"Film Noir"},
                       {name:"Foreign"},
                       {name:"History"},
                       {name:"Holiday"},
                       {name:"Horror"},
                       {name:"Indie"},
                       {name:"Music"},
                       {name:"Mystery"},
                       {name:"Road Movie"},
                       {name:"Romance"},
                       {name:"Science"}, 
                       {name:"Sport"},
                       {name:"Suspense"},
                       {name:"Thriller"},
                       {name:"War"},
                       {name:"Western"}]; 

        $scope.countries=[{country:"United States"},
                        {country:"United Kingdom"},
                        {country:"Germany"},
                        {country:"Australia"},
                        {country:"New Zealand"},
                        {country:"Costa Rica"},
                        {country:"Mexico"},
                        {country:"Chile"},
                        {country:"Brazil"}
                       ]; 

         $scope.stories=[{id:32,story:"Inglourious Basterds is a 2009 war film written and directed by Quentin Tarantino and starring Brad Pitt, Christoph Waltz and Mlanie Laurent. The film tells the fictional story of two plots to assassinate the Nazi Germany political leadership, one planned by a young French Jewish cinema proprietor Laurent, and the other by a team of Jewish Allied soldiers led by First Lieutenant Aldo Raine. Development on Inglourious Basterds began in 1998, when Tarantino wrote the script for the film. Tarantino struggled with the ending and chose to hold off filming and moved on to direct the two-part film Kill Bill. After directing Death Proof in 2007 Tarantino returned to work on Inglourious Basterds. The film went into production in October 2008 and was filmed in Germany and France with a production budget of $70 million. Inglourious Basterds premiered on May 20, 2009 at the 62nd Cannes Film Festival, where it competed for the Palme d Or. It... "},
                         {id:33,story:"A slave turned bounty hunter sets out to rescue his wife from the brutal Calvin Candie, a Mississippi plantation owner."},
                         {id:34,story:"Katniss Everdeen has returned home safe after winning the 74th Annual Hunger Games along with fellow tribute Peeta Mellark. Winning means that they must turn around and leave their family and close friends, embarking on a Victor s Tour of the districts. Along the way Katniss senses that a rebellion is simmering, but the Capitol is still very much in control as President Snow prepares the 75th Annual Hunger Games (The Quarter Quell) - a competition that could change Panem forever."},
                         {id:35,story:"Pulp Fiction is a 1994 American crime film directed by Quentin Tarantino, who co-wrote its screenplay with Roger Avary. The film is known for its rich, eclectic dialogue, ironic mix of humor and violence, nonlinear storyline, and host of cinematic allusions and pop culture references. The film was nominated for seven Oscars, including Best Picture; Tarantino and Avary won for Best Original Screenplay. It was also awarded the Palme d Or at the 1994 Cannes Film Festival. A major critical and commercial success, it revitalized the career of its leading man, John Travolta, who received an Academy Award nomination, as did costars Samuel L. Jackson and Uma Thurman. Directed in a highly stylized manner, Pulp Fiction joins the intersecting storylines of Los Angeles mobsters, fringe players, small-time criminals, and a mysterious briefcase. Considerable screen time is devoted to conversations and monologues that reveal the characters senses of humor and perspectives on life. The films title... "},
                         {id:36,story:"Sequel of Star Trek "},
                         {id:37,story:"Katniss Everdeen has returned home safe after winning the 74th Annual Hunger Games along with fellow tribute Peeta Mellark. Winning means that they must turn around and leave their family and close friends, embarking on a Victor s Tour of the districts. Along the way Katniss senses that a rebellion is simmering, but the Capitol is still very much in control as President Snow prepares the 75th Annual Hunger Games (The Quarter Quell) - a competition that could change Panem forever."},
                         {id:39,story:"fgfgfgfg"}
                        ];
 




           $scope.movies=[{id:1,src:"images/1.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                          {id:2,src:"images/2.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                          {id:3,src:"images/3.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                          {id:4,src:"images/4.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                          {id:5,src:"images/5.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                          {id:6,src:"images/6.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                          {id:7,src:"images/7.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                          {id:8,src:"images/8.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."},
                          {id:9,src:"images/9.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                          {id:10,src:"images/10.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                          {id:11,src:"images/11.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                          {id:12,src:"images/12.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                          {id:13,src:"images/13.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                          {id:14,src:"images/14.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                          {id:15,src:"images/15.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                          {id:16,src:"images/16.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."},
                          {id:17,src:"images/17.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                          {id:18,src:"images/18.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                          {id:19,src:"images/19.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                          {id:20,src:"images/20.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                          {id:21,src:"images/21.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                          {id:22,src:"images/22.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                          {id:23,src:"images/23.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                          {id:24,src:"images/24.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."},
                          {id:25,src:"images/25.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                          {id:26,src:"images/26.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                          {id:27,src:"images/27.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                          {id:28,src:"images/28.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                          {id:29,src:"images/29.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                          {id:30,src:"images/30.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                          {id:31,src:"images/31.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                          {id:32,src:"images/32.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."},
                          {id:33,src:"images/33.jpg",title:"Inglourious Basterds",year:"2009",rating:"6K",comments:"55",queue:"454",review:"Great film, great cast, some amazing stand out scenes. Really liked it."},
                          {id:34,src:"images/34.jpg",title:"Django Unchained",year:"2012",rating:"4K",comments:"163",queue:"704",review:"Imaginative, smart, entertaining and never boring "},
                          {id:35,src:"images/35.jpg",title:"The Hunger",year:"2013",rating:"1K",comments:"70",queue:"147",review:"Simply awesome! And Christoph Waltz earned his Oscar for sure! "},
                          {id:36,src:"images/46.jpg",title:"Pulp Fiction ",year:"1994",rating:"13K",comments:"188",queue:"1K",review:"A good fiction and an aliter end for the Nazis!!"},
                          {id:37,src:"images/37.jpg",title:"Reservoir Dogs",year:"1992",rating:"4K",comments:"55",queue:"888",review:"Classic Tarentino "},
                          {id:38,src:"images/38.jpg",title:"THE EXORICIST",year:"1973",rating:"1K",comments:"19",queue:"138",review:"Excellent film. Cool characters and lots of violence. "},
                          {id:39,src:"images/39.jpg",title:"Star Trek Into Darkness",year:"2013",rating:"583",comments:"73",queue:"265",review:"A retake of the Nazi history Quentin Tarantino style. "},
                          {id:40,src:"images/40.jpg",title:"Silver Linings Playbook",year:"2012",rating:"2K",comments:"115",queue:"442",review:"Very entertaining, great acting, ultra-violent (Tarantino, duh). Perfect."}
                          ];

                          
                          $scope.newrating = sharedProperties.getRating;
                          var id=$scope.newrating;
                          $scope.comment = sharedProperties.getString;     
     
                           $scope.hide=function(){
                           setInterval(function(){
                               $('#rate1').addClass('display');          
                               $('#rate2').removeClass('display');
                             }, 2000);           
                            };


                           $scope.loadMore = function() {
                            alert("hai")
                            var last = $scope.movies[$scope.movies.length - 1];
                            for(var i = 1; i <= 40; i++) {
                            $scope.movies.push(last + i);
                           }
                          };
                                     
 
                          $scope.tabs = [{
                            title: 'RECENT ACTIVITIES',
                            url: 'one.tpl.html'
                           }, {
                                title: 'SYNOPSIS',
                                url: 'two.tpl.html'
                                }  
                          ];

                            $scope.currentTab = 'one.tpl.html';
                            $scope.linkTab='two.tpl.html';

                            $scope.onClickTab = function (tab) {
                            $scope.currentTab = tab.url;
                            }
    
                             $scope.isActiveTab = function(tabUrl) {
                               return tabUrl == $scope.currentTab;
                             }   
 



           $scope.addClass1 = function(){ 
                   $('#plus1').toggleClass('p10');
                   $('#plus2').removeClass('p10');
                   $('#plus3').removeClass('p10');
                   $('#plus4').removeClass('p10');
                   $('#plus5').removeClass('p10');
                   
                           
               };

          $scope.addClass2 = function(){ 
                    
                   $('#plus2').toggleClass('p10');
                   $('#plus1').removeClass('p10');
                   $('#plus3').removeClass('p10');
                   $('#plus4').removeClass('p10');
                   $('#plus5').removeClass('p10');
                    
                };

           $scope.addClass3 = function(){ 
                    
                   $('#plus3').toggleClass('p10');
                   $('#plus1').removeClass('p10');
                   $('#plus2').removeClass('p10');
                   $('#plus4').removeClass('p10');
                   $('#plus5').removeClass('p10');
                   
                };

             $scope.addClass4 = function(){ 
                    
                   $('#plus4').toggleClass('p10');
                   $('#plus1').removeClass('p10');
                   $('#plus3').removeClass('p10');
                   $('#plus2').removeClass('p10');
                   $('#plus5').removeClass('p10');
                    
                };

             $scope.addClass5 = function(){ 
                    
                   $('#plus5').toggleClass('p10');
                   $('#plus1').removeClass('p10');
                   $('#plus3').removeClass('p10');
                   $('#plus4').removeClass('p10');
                   $('#plus2').removeClass('p10');
                   
                };
             
             $scope.liked = 'Like';
             $scope.likeCount=0;         
             var hasLiked = false;
             $scope.likeClick = function () {
     
                if (!hasLiked) {
                 
                hasLiked = true;
                $scope.liked = 'Unlike';
                $scope.likeCount = $scope.likeCount+1;
                 
                } else {
                    
                   hasLiked = false;
                    $scope.liked = 'Like';
                    $scope.likeCount = $scope.likeCount-1;
                     
               }

              };

              $scope.open = function () {
             
              var modalInstance = $modal.open({
                templateUrl: 'wizard.html',
                controller: 'ModalCtrl',
                controllerAs: 'modal'
             });              
           };
            
            $scope.hidequeue=function(){
              $('#queue').addClass("display");
              $('#p1').removeClass("addcolor1");          
              $('#p3').removeClass("addcolor2");

            }

                 

    });
   

    
    


 app.controller("MovieCtrl", function($scope,$routeParams){
     

      $scope.Id  = $routeParams.Id

    
 });
 
app.controller('ModalCtrl', function ($scope,$routeParams,$modalInstance,sharedProperties) {
   $scope.Id  = $routeParams.Id
   var modal = this;

    modal.steps = ['one', 'two', 'three'];
    modal.step = 0;
    

    modal.isFirstStep = function () {
    return modal.step === 0;
};

modal.isLastStep = function () {
    return modal.step === (modal.steps.length - 1);
};

    modal.isCurrentStep = function (step) {
        return modal.step === step;
    };

    modal.setCurrentStep = function (step) {
        modal.step = step;
    };

    modal.getCurrentStep = function () {
        return modal.steps[modal.step];
    };


    

modal.getNextLabel = function () {
    return (modal.isLastStep()) ? 'Submit' : 'Next';
};

modal.handlePrevious = function () {
    modal.step -= (modal.isFirstStep()) ? 0 : 1;
};

modal.handleNext = function () {
    if (modal.isLastStep()) {
        $modalInstance.close(modal.wizard);
    } else {
        modal.step += 1;

    }
};

 modal.dismiss = function( ) {

    $modalInstance.dismiss();
      
};

   $scope.rating = 5;
     $scope.newrating = sharedProperties.getRating();
      $scope.rateFunction = function(rating) {
      sharedProperties.setRating(rating);
    };  


    
    $scope.newsmilerating=sharedProperties.getSmileRating();
    $scope.smilerating=function(x){
       sharedProperties.setSmileRating(x);
    for(var i=1;i<=5;i++)
       { 
        if(i<=x)
        {
          var y='#s'+i;
          $(y).addClass('smiledisplay');
        }else { 
        var y='#s'+i;
        $(y).removeClass('smiledisplay');
       }
      }
  };


  $scope.runAutoSave = true;
  $scope.test='save';
  $scope.comment = sharedProperties.getString();
    $scope.savereview = function(newValue) {
    sharedProperties.setString(newValue);
                setInterval(function(){
                     $scope.test="save";
                     
                }, 1000);
                $scope.test="saved";              
    };
  

}); 
 
 app.directive('autosave', function ($compile) {
    return {
        compile: function compile(tElement, tAttrs) {

            return function postLink(scope, iElement, iAttrs) {

                var shouldRun = scope.$eval(iAttrs.autosave);

                if (shouldRun) {
                    iElement.find(':input[ng-model]').each(function () {
                        $(this).attr("ng-click", iAttrs.ngSubmit);
                    });
                    $compile(iElement.contents())(scope);
                    console.log("Done");
 
                }
            }; //end linking fn
        }
    };
});