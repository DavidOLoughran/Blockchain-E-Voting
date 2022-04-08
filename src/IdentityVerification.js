// // Example React Component

// const YotiButton = props => {
//     const buttonRef = useRef(null)

//     useEffect(() => {
//         const yoti = window.Yoti.Share.init({
//             'elements': [{
//                 'clientSdkId': props.clientSdkId,
//                 'scenarioId': props.scenarioId,
//                 'domId': buttonRef.current.id,
//                 'button': {
//                     'label': props.text
//                 }
//             }]
//         })

//         return yoti.destroy
//     }, [props.clientSdkId])
//     return (
//         <div
//             style={{ height: props.height, width: props.width }}
//             ref={buttonRef}
//             id="button-ref"
//         />
//     )
// }

// export default YotiButton;