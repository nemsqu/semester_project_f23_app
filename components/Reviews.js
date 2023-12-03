import { Pressable, View, Text, ScrollView } from "react-native"
import { styles } from "../styles/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircleUser, faPerson } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { MessageOverlay, ReviewOverlay } from "./MessageOverlay"
import { Button, Tooltip } from '@rneui/themed';

const reviews = [{"id": 1, "writer": "Jane Doe", "comment": "I didn't really like this product but it is whatever, someone else might like it.", "photo": "null", allowContact: true},
{"id": 2, "writer": "Jane Doe", "comment": "Perfect", "photo": null, allowContact: false},
{"id": 3, "writer": "Jane Doe", "comment": "Recommend", "photo": null, allowContact: true}]

export const Reviews = () => {
    const [overlayOpen, setOverlayOpen] = useState(false);
    const loggedIn = true;
    const [showTooltip, setShowTooltip] = useState(false);
    return(
        <View style={{flex: 4, maxHeight: 400}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5}}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <Tooltip
                    visible={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                    popover={<Text style={{ color: "#fff" }}>Login to leave a review</Text>}
                    containerStyle={{width: 200}}
                >
                    <Button buttonStyle={styles.button} onPress={() => setOverlayOpen(true)} type="outline" disabled={!loggedIn}>
                        <Text>Leave review</Text>
                    </Button>
                </Tooltip>
                <ReviewOverlay visible={overlayOpen} setVisible={setOverlayOpen} />
            </View>
            <ScrollView style={{height: 300, borderWidth: 1, minWidth: '90%', alignContent: 'space-between', borderRadius: 5, shadowColor: 'grey', shadowRadius: 1}}>
                {reviews.map((review) => {
                    return(<Review key={review.id} writer={review.writer} comment={review.comment} photo={review.photo} allowContact={review.allowContact} />)
                })}
            </ScrollView>
        </View>
    )
}

const Review = ({writer, comment, photo, allowContact}) => {
    const [visible, setVisible] = useState(false);
    const loggedIn = true;
    const [showTooltip, setShowTooltip] = useState(false);

    const messageClick = () => {
        if(loggedIn){
            setVisible(!visible)
        } else {
            setShowTooltip(true);
        }
    }

    return(
        <View style={{borderColor: 'black', borderBottomWidth: 1, alignItems: 'stretch', marginVertical: 5, padding: 5}}>
            <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', marginBottom: 5}}>
                {photo ? <FontAwesomeIcon icon={faPerson} size={30} style={{marginRight: 10}} /> : <FontAwesomeIcon icon={faCircleUser} size={30} style={{ marginRight: 10}} />}
                <Text style={{margin: 5}}>{writer}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <MessageOverlay visible={visible} setVisible={setVisible} recipient={writer}/>
                <Text style={{width: '65%'}}>{comment}</Text>
                <Tooltip
                    visible={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                    popover={<Text style={{ color: "#fff" }}>Login to send a message</Text>}
                    containerStyle={{width: 200}}
                >
                    {allowContact && <Button style={styles.button} onPress={messageClick} disabled={!loggedIn}>
                        <Text>Message</Text>
                    </Button>}
                </Tooltip>
            </View>
        </View>
    )
}