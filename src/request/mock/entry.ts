import mock from "."

mock.onGet("/v1/entries").reply(200, {
    entries: [
        {
            id: "06797611-7375-40a3-8f19-c7ee15467a0b",
            title: "Aut eveniet ad temporibus laboriosam quia dignissimos.",
            content:
                "Veniam est labore et et perspiciatis vel et qui. Voluptatum voluptas laudantium id laborum nobis doloribus voluptas enim. Cum eum delectus eveniet modi minima magni voluptate rerum.",
            creatorId: "7c54254a-9134-4ff2-aaf7-4e1c1889f863",
        },
        {
            id: "ac97dab5-6f53-4537-a491-93294ad419e5",
            title: "Quos occaecati optio quia voluptates autem.",
            content:
                "Rerum omnis dolorem qui commodi velit. Assumenda ab voluptas molestiae quo nihil aut expedita. Ratione sit nobis id totam fugiat. Quis sint aut explicabo voluptatem quibusdam qui est nihil. Facilis deserunt vitae et explicabo. Nihil quod optio odit totam.",
            creatorId: "7c54254a-9134-4ff2-aaf7-4e1c1889f863",
        },
        {
            id: "bef0076c-6bc1-4bd9-bb46-79823a45b766",
            title: "Maxime aut voluptatem voluptas ea minima sit rerum. Voluptatem explicabo reiciendis quo.",
            content:
                "Vero et sint est tempore aut corporis. Ut voluptas sint consectetur vel eos ut laborum. Harum qui ut corrupti reiciendis voluptatem aliquam. Ducimus delectus dolore adipisci.",
            creatorId: "7c54254a-9134-4ff2-aaf7-4e1c1889f863",
        },
    ],
})
