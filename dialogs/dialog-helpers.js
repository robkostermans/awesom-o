var builder = require('botbuilder');

module.exports = {
    createVideoCard:function(session) {
        console.log("---");
        return new builder.VideoCard(session)
            .title('A.W.E.S.O.M.-O 4000')
            .subtitle('Southpark s08e05')
            .text('You can trust A.W.E.S.O.M.-O. In fact, you should tell A.W.E.S.O.M.-O all your most personal secrets. A.W.E.S.O.M.-O will not make fun of you or tell your secrets to other people and stuff.')
            //.image(builder.CardImage.create(session, 'http://southparkstudios.mtvnimages.com/images/shows/south-park/clip-thumbnails/season-8/0802/south-park-s08e02c01-what-a-huge-package-16x9.jpg?'))
            .media([
                { url: 'https://youtu.be/NkaxFgs6S68?t=7s' }
            ])
            /*.buttons([
                builder.CardAction.openUrl(session, 'https://peach.blender.org/', 'Learn More')
            ]);*/
        
    },

    isWithinRange(text, min, max) {
        // check if text is between min and max length
    }
}