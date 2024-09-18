import { useRef } from 'react'
import { View, Text, FlatList } from 'react-native'
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { styles } from './style'
import { contacts } from '../../utils/contact'
import { Card } from '../../components/card'
import { Option } from '../../components/option'


export function Home() {
    const openSwipeableRef = useRef<SwipeableMethods | null>(null)

    function handleOnSwipeableWillOpen(direction: "left" | "right", curret:SwipeableMethods | null) {
        if (direction === "left") {
            console.warn("DELETAR!")
        }
        if(openSwipeableRef.current){
            openSwipeableRef.current.close()
        }
        openSwipeableRef.current = curret
    }
    return (
        <View style={styles.container}>

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    let curret:SwipeableMethods | null = null

                    return (
                        <Swipeable
                            ref={(swipeable) => (curret = swipeable)}
                            containerStyle={styles.containerStyle}
                            overshootRight={false}
                            overshootLeft={false}
                            friction={2}
                            rightThreshold={20}
                            leftThreshold={20}
                            // overshootFriction={200}é para fazer um efeito de mola
                            // onSwipeableOpen={()=> console.warn("ABRIU")}
                            // onSwipeableWillOpen={()=>console.warn("INTENÇÃO QUE VAI ABRIR")}
                            onSwipeableWillOpen={(direction)=>handleOnSwipeableWillOpen(direction, curret)}
                            renderLeftActions={() =>
                                <View style={styles.leftActions}>
                                    <Option icon='delete' backgroundColor={"#e83d55"} />
                                </View>
                            }
                            renderRightActions={() =>
                                <View style={styles.rightActions}>
                                    <Option icon='open-in-new' backgroundColor={"#00b960"} />
                                    <Option icon='close' backgroundColor={"#3e68d7"} />
                                </View>
                            }                    >
                            <Card name={item.name} email={item.email}></Card>
                        </Swipeable>)
                }}
                contentContainerStyle={styles.content}
            />
        </View>
    )
}



