function locomotiveAnimation()
{
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.defaults({ scroller: "#main" });
    // --- SETUP END ---
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    

}
function navAnimation(){
    var nav=document.querySelector(".nav")
nav.addEventListener("mouseenter",function(){
    let tl=gsap.timeline()
    tl.to(".nav-bottom",{
        height:"21vh",
        duration:0.5}
    )
    tl.to(".nav2 h5",{
        display:"block",
        duration:0.1
    })
    tl.from(".nav2 h5 span",{
        y:25,
        
        stagger:{
            amount:0.5
        }
    })
})
nav.addEventListener("mouseleave",function(){
    let tl=gsap.timeline()
    
    tl.to(".nav2 h5 span",{
        y:0,
        
        stagger:{
            amount:0.2
        }
    })
    tl.to(".nav2 h5",{
        display:"none",
        duration:0.1

    })
    tl.to(".nav-bottom",{
        height:0,
        duration:0.2
    })
})
}

function page2(){ rightElems= document.querySelectorAll(".right-elem")
rightElems.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        gsap.to(elem.childNodes[3],{
            opacity:1,
            scale:1
    })
})
    elem.addEventListener("mouseleave",function(){
        
            gsap.to(elem.childNodes[3],{
                opacity:0,
                scale:0
        })
    })

    elem.addEventListener("mousemove",function(dets){
        gsap.to(elem.childNodes[3],{
          x:dets.x-elem.getBoundingClientRect().x-50,
          y:dets.y-elem.getBoundingClientRect().y-100
        })
    })
    
})}

function page3VidAnimation(){
var page3Center=document.querySelector(".page3-center")
var video=document.querySelector(".page3 video")
page3Center.addEventListener("click",function(){
    video.play()
    gsap.to(video,{
        opacity:1,
        transform:"scaleX(1) scaleY(1)",
        borderRadius:0
        
    })
})
video.addEventListener("click",function(){
    video.pause()
    gsap.to(video,{
        opacity:0,
        transform:"scaleX(0.7) scaleY(0)",
        borderRadius:"30px"
        
    })

})
}
function page4Animation(){
var section=document.querySelectorAll(".sec-right")
section.forEach(function(eleme){
    eleme.addEventListener("mouseenter",function(){
      
         eleme.childNodes[3].style.opacity=1
         eleme.childNodes[3].play()
        
    })
    eleme.addEventListener("mouseleave",function(){
      
        eleme.childNodes[3].style.opacity=0
        eleme.childNodes[3].load()
       
   })

})
}
function page6Animation(){
    gsap.from("#btm6-part2 h4",{
    x:0,
    duration:1,
    scrollTrigger:{
        trigger:"#btm6-part2",
        scroller:"#main",
        start:"top 80%",
        end:"top 10",
        scrub:true

    }
})
}
function loadingAnimation(){
   var tl=gsap.timeline()
   tl.from(".page1",{
    opacity:0,
    duration:0.3,
    delay:0.1
   })
   tl.from(".page1",{
    transform:"scaleX(0.7) scaleY(0.2) translateY(30%)",
    borderRadius:"100px",
    duration:2,
    ease:"expo.out"
   })
   tl.from(".nav",{
    opacity:0
   })
   tl.from(".page1 h1,.page1 p,.page1 div",{
    opacity:0,
    duration:0.5,
    stagger:0.2
   })
}
locomotiveAnimation()
navAnimation()
page2()
page3VidAnimation()
page4Animation()
page6Animation()
loadingAnimation()
