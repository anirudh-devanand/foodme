import React,{useRef, useState, useEffect} from 'react'; 
import Nav from '../Components/Nav/Nav';
import './LandingPage.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import landingPageImg from "../assets/landingPage.png"



const LandingPage = () => {
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const spanRefs = useRef([]);
  const alphas = ['F','O', 'O', 'D', 'M', 'E'];

  const bgImgRef = useRef(null);
  const secondayImg1 = useRef(null);
  const secondayImg2 = useRef(null);
  const navRef = useRef(null);
  const infoRef = useRef(null);
    const scrollerRef = useRef(null);



  useGSAP(() => {

      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
          gsap.registerPlugin(ScrollTrigger);
          let tl = gsap.timeline({
              defaults: { duration: 5},
              scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top top",
                  end: "bottom 90%",
                  scrub: true,
                  pin: true,
                  markers: true
              },
          });

          

          gsap.to(
              bgImgRef.current,
              {
                  Opacity: 1,
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  duration: 2,
                  opacity: 0.4,
                  ease: "power2.inOut"
              }, 
          );
          


          spanRefs.current.forEach((span, index) => {
              gsap.to(
                  span, 
                    {
                      ease: "circ.out",
                      y: -10,
                      opacity: 1,
                      duration: 2.61,
                      delay: 3 + (index * 0.1), 
                    },
              ),
              "<"
          });  

          gsap.fromTo(
            navRef.current, 
            {
              opacity: 0, 
            }, 
            {
                y:0,
                opacity: 1,
                duration:2,
            }
            ,"<"
          );
          

          gsap.to(
              bgImgRef.current, 

              {
                  scale: 0.6, 
                  y: -40, 
                  duration:1,
                  delay: 3,
                  filter: "blur(2px)",
              }, 
          );

          gsap.to(
            secondayImg1.current, 
            {
                x: 200, 
                rotate: 10,
                opacity: 1,
                duration: 1.5,
                filter: "blur(2px)",
            }, 
            "<"
        );

        gsap.to(
            secondayImg2.current, 
            {
                x: -200,
                rotate: -10,
                opacity: 1,
                duration: 1.5,
                filter: "blur(2px)",
            }, 
            "<"
        );   

                    
        tl.to(
            containerRef.current,
            {
                opacity: 0,
            },
        ); 
        
        tl.to(
            infoRef.current,
            {
                opacity: 1,
            },
        );  

        const masks = document.querySelectorAll('.mask');

        masks.forEach((mask) => {
            let tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: infoRef.current, 
                    start: "top 10%",
                    end: "top top", 
                    scrub: true,
                }
            }); 

            let img = mask.querySelector('img');

            
            tl2.set(mask, {autoAlpha: 1});

            tl2.from(
                mask, 2, 
                {
                    yPercent: -100, 
                    duration:2,
                    ease: "power2.inOut"
                }
            ); 
            tl2.from(
                img, 2, 
                {
                    yPercent: 100, 
                    scale: 1.3,
                    ease: "power2.inOut"
                }, 
                "<"
            );
        });

        // let tl2 = gsap.timeline({
        //     defaults: { duration: 5},
        //     scrollTrigger: {
        //         trigger: containerRef.current,
        //         start: "bottom 90%",
        //         end: "bottom 70%",
        //         scrub: true,
        //         pin: true,
        //         markers: true
        //     },
        // });

        // tl2.fromTo(
        //     scrollerRef.current, 
        //     {
        //         opacity: 0, 
        //         y: 100
        //     }, 

        //     {
        //         y: 0,
        //         opacity: 1
        //     }
        // );

      });
      return () => ctx.revert();
  }, []);

  return (
        <div className='parallax'>
        
        <Nav ref={navRef}/>

        <div className="landingWrapper">
         
        <div ref={containerRef} className="container">
            <h1 ref={h1Ref}>
                
            {[...Array(8)].map((key ,index) => (
                <div className='text' style={{display: "inline-block"}} 
                    ref={(el) => (spanRefs.current[index] = el)}>{alphas[index]}</div>
            ))}
            </h1>

        <div ref={bgImgRef} className='bgImg'>
                <img src="/src/assets/landingPage.png"/>
        </div>


        <div ref={secondayImg1} className='secondaryImg'>
            <img src="/src/assets/img2.png"/>
        </div>

        <div ref={secondayImg2} className='secondaryImg'>
            <img src="/src/assets/img3.png"/>
        </div>



        </div>

        <div>
        <div className='info' >
            <div className="infoLeft infoTop" ref={infoRef}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo 
                eos doloremque cupiditate eum quis, eaque vero quam dolores laborum excepturi 
                molestiae voluptatem quae ullam, possimus et. Voluptas in eius quaerat.</p>
                <div className="infoRight">
                    <p>SKfbsfkbuafhisdafs</p>
                </div>
            </div>

            <div className="imageScroller infoBottom" ref={scrollerRef}>
                <div className="scroller">
                    <div className="mask">
                        <img src='/src/assets/scrollerImg.png'/>
                    </div>
                </div>
                    <div className="scroller">
                        <div className="mask">
                            <img src='/src/assets/scrollerImg2.png'/>
                        </div>
                </div>
                <div className="scroller">
                    <div className="mask">
                        <img src='/src/assets/scrollerImg3.png'/>
                    </div>
                </div>

            </div>
        
        </div>
        </div>
       
        </div>

        </div>
   
  )
}

export default LandingPage