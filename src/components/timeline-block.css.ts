import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
// import { maxMedia } from "./ui.css"

export const maxMedia = {
    small: `screen and (max-width: 900px)`,
    medium: `screen and (max-width: 600px)`,
  }

export const listItem = style({
    listStyleType: "none",
    position: "relative",
    width: "6px",
    margin: "0 auto",
    paddingTop: "50px",
    background: "#ccc",
    selectors: {
        '&:after': {
            content:"",
            position:"absolute",
            left:"50%",
            bottom:0,
            transform:"translateX(-50%)",
            width:"30px",
            height: "30px",
            borderRadius: "50%",

            zIndex: 1,
            background:"#ccc",

            transition: "background 0.5s ease-in-out"
        }
    },
    "@media": {
        [maxMedia.small]: {
            marginLeft:"20px"
         },
    },

    
})

export const listItemInView = style({
    selectors: {
        '&:after': {
            background: "#f5f5f5"
        }
    }
})

// .timeline ul li.in-view::after {
//     background: #f45b69;
//   }

export const block = style ({
    position: "relative",
    bottom: "0",
    width: "400px",
    padding: "15px",
    background: "#f5f5f5",

    visibility: "hidden",
    opacity: 0,
    transition: "all 0.5s ease-in-out",

    selectors: {
        '&:before': {
            content: "",
            position: "absolute",
            bottom: "7px",
            width: "0",
            height: "0",
            borderStyle: "solid",
        }
    },
    "@media": {
        [maxMedia.medium]: {
           width:"250px"
        },
        [maxMedia.small]: {
            width: "calc(100vw - 191px)"
         },
    },
    
})



export const odd = style({
    left: "45px",

    transform: "translate3d(200px, 0, 0)",
    selectors: {
        '&:before': {
            left: "-15px",
            borderWidth: "8px 16px 8px 0",
            borderColor: "transparent #f5f5f5 transparent"
        }
    },
})

export const even = style({
    left: "-439px",

    transform: "translate3d(-200px, 0, 0)",
    selectors: {
        '&:before': {
            right: "-15px",
            borderWidth: "8px 0 8px 16px",
            borderColor: "transparent transparent transparent #f5f5f5 "
        }
    },
    "@media": {
        [maxMedia.medium]: {
           left:"-289px"
        },
        [maxMedia.small]: {
            left:"45px",
            selectors:{
                '&:before':{
                    left: "-15px",
                    borderWidth:"8px 16px 8px 0",
                    borderColor:"transparent #f5f5f5 transparent transparent"
                }
            }
         },
    },
})

export const blockInView = style({
    transform: "none",
    visibility: "visible",
    opacity: 1,
    
})

// .timeline ul li.in-view div {
//     transform: none;
//     visibility: visible;
//     opacity: 1;
//   }

export const time = style({
    display: "block",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "8px",
})