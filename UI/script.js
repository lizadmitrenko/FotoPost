"use strict";

let module = (function () {

    let photoPosts = [
        {
            id: '1',
            description: 'Look at my art!',
            date: new Date('2018-02-17T22:39:00'),
            name: 'MaryLee.io.photopost',
            photoLink: 'images/23182.jpg',
            hashtags: ['Girl', 'Art', 'style'],
            likes: ['BossLemon', 'KateOrient', 'Denis', 'Vlados'],
        },

        {
            id: '2',
            description: 'My favourite food!',
            date: new Date('2018-02-16T18:12:00'),
            name: 'Food.io.photopost',
            photoLink: 'images/4.png',
            hashtags: ['food','homefood'],
            likes: ['MaryLee', 'Denis'],
        },

        {
            id: '3',
            description: 'My gym needs me!',
            date: new Date('2018-02-16T08:22:00'),
            name: 'Homenko.io.photopost',
            photoLink: 'images/2.jpg',
            hashtags: ['blog', 'HomenkoTV'],
            likes: ['Vanya', 'AnyaKiselka'],
        },

        {
            id: '4',
            description: 'Morning!',
            date: new Date('2018-02-15T21:53:00'),
            name: 'ChanYeol.io.photopost',
            photoLink: 'images/3.jpg',
            hashtags: ['morning', 'fun'],
            likes: ['MaryLee'],
        },

        {
            id: '5',
            description: 'Maмина радость, лизина сладость',
            date: new Date('2018-02-15T12:48:00'),
            name: 'MaryLee.io.photopost',
            photoLink: 'images/5.png',
            hashtags: ['suho', 'exo'],
            likes: ['KateOrient','AnyaKiselka'],
        },

        {
            id: '6',
            description: 'Thanks for work!',
            date: new Date('2018-02-15T04:13:00'),
            name: 'exid.io.photopost',
            photoLink: 'images/10.jpg',
            hashtags: [],
            likes: ['Vladik'],
        },

        {
            id: '7',
            description: 'Great fanart!',
            date: new Date('2018-02-14T22:02:00'),
            name: 'exofan.io.photopost',
            photoLink: 'images/6.png',
            hashtags: ['k-pop', 'art', 'music', 'love'],
            likes: ['MaryLee'],
        },

        {
            id: '8',
            description: 'Hey,you!',
            date: new Date('2018-02-15T09:35:00'),
            name: 'Hyuna.io.photopost',
            photoLink: 'images/8.jpg',
            hashtags: [],
            likes: ['Vladik', 'Vlados'],
        },

        {
            id: '9',
            description: 'Look at this abs!',
            date: new Date('2018-02-13T23:23:00'),
            name: 'chiminfan.io.photopost',
            photoLink: 'images/7.jpg',
            hashtags: ['bts','body'],
            likes: [],
        },

        {
            id: '10',
            description: 'sexy photo',
            date: new Date('2018-02-12T01:03:00'),
            name: 'iu.io.photopost',
            photoLink: 'images/9.jpg',
            hashtags: ['iu'],
            likes: ['Vladik'],
        }
    ];

    function check(i, tag) {
        for(let j = 0; j < (photoPosts[i].hashtags).length; j++)
            if (photoPosts[i].hashtags[j] === tag)
                return true;
        return false;
    }

    function getPhotoPost(id) {
        return photoPosts.find(x => x.id === id);
    }

    function validate(post)
    {
        if(typeof(post.name) !== 'string' || typeof(post.description) !== 'string' || !post.description ||
            !post.name || !post.photoLink || typeof(post.photoLink) !== 'string'||
            typeof(post.id) !== 'string' || !(post.date instanceof Date)){
            return false;
        }
        return true;
    }

    function addPhotoPost(post) {
        if (validate(post) === false)
            return false;
        else {
            photoPosts.push(post);
            return true;
        }
    }

    function editPhotoPost(id, post) {
        if (getPhotoPost(id) !== false && post.id === undefined && post.name === undefined && post.date === undefined && post !== undefined){
            if(post.description !== undefined && post.description.length < 200)
                getPhotoPost(id).description = post.description;
            if(post.hashtags !== undefined)
                getPhotoPost(id).hashtags = post.hashtags;
            if(post.photoLink != undefined)
                getPhotoPost(id).photoLink = post.photoLink;
            return true;
        }
        return false;
    }

    function removePhotoPost(id) {
        if (getPhotoPost(id) !== false) {
            photoPosts.splice(photoPosts.indexOf(getPhotoPost(id)), 1);
            return true;
        }
        else
            return false;
    }

    function compareDate(a, b) {
        return (b.date).getTime() - (a.date).getTime();
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let Array = [];
        photoPosts.sort(compareDate);
        let count = 0;

        if (filterConfig === undefined) {
            for (let i = skip; i < top + skip; i++) {
                if (i > photoPosts.length - 1) {
                    return Array;
                }
                Array.push(photoPosts[i]);
            }
        }
        else {

            if(filterConfig.name !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags !== undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && (photoPosts[i].date).getTime() < (filterConfig.up).getTime() && (photoPosts[i].date).getTime() > (filterConfig.bottom).getTime()  && check(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

           else if(filterConfig.name === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags !== undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].date.getTime() < filterConfig.up.getTime() && photoPosts[i].date.getTime() > filterConfig.bottom.getTime() && check(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags !== undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && check(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags === undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && photoPosts[i].date.getTime() < filterConfig.up.getTime() && photoPosts[i].date.getTime() > filterConfig.bottom.getTime()) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags !== undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(check(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags === undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags === undefined){
                Array = photoPosts.filter(function(post,i,photoPosts) {
                    if((photoPosts[i].date).getTime() <= (filterConfig.up).getTime() && (photoPosts[i].date).getTime() >= (filterConfig.bottom).getTime()) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags === undefined){
                for (let i = skip; i < top + skip; i++) {
                    if (i > photoPosts.length - 1) {
                        if (Array.length === 0)
                            return null;
                        return Array;
                    }
                    Array.push(photoPosts[i]);
                }
            }
        }
        return Array;

    }

    return {
        getPhotoPosts: getPhotoPosts,
        getPhotoPost: getPhotoPost,
        validate: validate,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost
    }
})();
