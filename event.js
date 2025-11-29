// Helper function to announce messages to screen readers
function announceToScreenReader(message) {
    const announcementRegion = document.getElementById('sr-announcements');
    if (announcementRegion) {
        // Clear and set new message to trigger announcement
        announcementRegion.textContent = '';
        setTimeout(() => {
            announcementRegion.textContent = message;
        }, 100);
    }
}

//purchasing spice generators
function buy_gen(color, id) {
    switch (color) {
        case "red":
            if (game.red_spice.cmp(game.red_spice_price[id]) >= 0) {
                game.red_spice = Decimal.max(
                    game.red_spice.sub(game.red_spice_price[id]),
                    0
                )
                game.red_spice_price[id] = game.red_spice_price[id].mul(1.2)
                game.red_spice_gen[id] = game.red_spice_gen[id].add(1)
                game.red_spice_bought[id] += 1n

                let red_bought = game.red_spice_bought[id] / 10n + 1n
                game.red_spice_boost[id] = new Decimal(
                    red_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.red_spice_boost[id] = new Decimal(
                        red_bought.toString()
                    )

                if (game.red_spice.cmp(0) < 0) game.red_spice = new Decimal(0)
            }
            break
        case "yellow":
            if (game.yellow_spice.cmp(game.yellow_spice_price[id]) >= 0) {
                game.yellow_spice = Decimal.max(
                    game.yellow_spice.sub(game.yellow_spice_price[id]),
                    0
                )
                game.yellow_spice_price[id] =
                    game.yellow_spice_price[id].mul(1.3)
                game.yellow_spice_gen[id] = game.yellow_spice_gen[id].add(1)
                game.yellow_spice_bought[id] += 1n

                let yellow_bought = game.yellow_spice_bought[id] / 10n + 1n
                game.yellow_spice_boost[id] = new Decimal(
                    yellow_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.yellow_spice_boost[id] = new Decimal(
                        yellow_bought.toString()
                    )

                if (game.yellow_spice.cmp(0) < 0)
                    game.yellow_spice = new Decimal(0)
            }
            break
        case "green":
            if (game.green_spice.cmp(game.green_spice_price[id]) >= 0) {
                game.green_spice = Decimal.max(
                    game.green_spice.sub(game.green_spice_price[id]),
                    0
                )
                game.green_spice_price[id] = game.green_spice_price[id].mul(1.4)
                game.green_spice_gen[id] = game.green_spice_gen[id].add(1)
                game.green_spice_bought[id] += 1n

                let green_bought = game.green_spice_bought[id] / 10n + 1n
                game.green_spice_boost[id] = new Decimal(
                    green_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.green_spice_boost[id] = new Decimal(
                        green_bought.toString()
                    )

                if (game.green_spice.cmp(0) < 0)
                    game.green_spice = new Decimal(0)
            }
            break
        case "blue":
            if (game.blue_spice.cmp(game.blue_spice_price[id]) >= 0) {
                game.blue_spice = Decimal.max(
                    game.blue_spice.sub(game.blue_spice_price[id]),
                    0
                )
                game.blue_spice_price[id] = game.blue_spice_price[id].mul(1.5)
                game.blue_spice_gen[id] = game.blue_spice_gen[id].add(1)
                game.blue_spice_bought[id] += 1n

                let blue_bought = game.blue_spice_bought[id] / 10n + 1n
                game.blue_spice_boost[id] = new Decimal(
                    blue_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.blue_spice_boost[id] = new Decimal(
                        blue_bought.toString()
                    )

                if (game.blue_spice.cmp(0) < 0) game.blue_spice = new Decimal(0)
            }
            break
        case "pink":
            if (game.pink_spice.cmp(game.pink_spice_price[id]) >= 0) {
                game.pink_spice = Decimal.max(
                    game.pink_spice.sub(game.pink_spice_price[id]),
                    0
                )
                game.pink_spice_price[id] = game.pink_spice_price[id].mul(1.6)
                game.pink_spice_gen[id] = game.pink_spice_gen[id].add(1)
                game.pink_spice_bought[id] += 1n

                let pink_bought = game.pink_spice_bought[id] / 10n + 1n
                game.pink_spice_boost[id] = new Decimal(
                    pink_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.pink_spice_boost[id] = new Decimal(
                        pink_bought.toString()
                    )

                if (game.pink_spice.cmp(0) < 0) game.pink_spice = new Decimal(0)
            }
            break
        case "crystal":
            if (game.rainbow_spice.cmp(game.crystal_spice_price[id]) >= 0) {
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(game.crystal_spice_price[id]),
                    0
                )
                game.crystal_spice_price[id] =
                    game.crystal_spice_price[id].mul(2)
                game.crystal_spice_gen[id] = game.crystal_spice_gen[id].add(1)
                game.crystal_spice_bought[id] += 1n

                let crystal_bought = game.crystal_spice_bought[id] / 5n
                game.crystal_spice_boost[id] = Decimal.pow(
                    2,
                    crystal_bought.toString()
                )
            }
            break
        case "arcane":
            if (
                game.ascend_complete[0] &&
                game.ascend_bought[16] &&
                game.ansuz.cmp(game.arcane_spice_price[id]) >= 0
            ) {
                game.ansuz = Decimal.max(
                    game.ansuz.sub(game.arcane_spice_price[id]),
                    0
                )
                game.arcane_spice_price[id] = game.arcane_spice_price[id].mul(3)
                game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(1)
                game.arcane_spice_bought[id] += 1n

                let arcane_bought = game.arcane_spice_bought[id] / 3n
                game.arcane_spice_boost[id] = Decimal.pow(
                    3,
                    arcane_bought.toString()
                )

                game.autods_budget = new Decimal(0)
            }
            break
        case "dark":
            if (game.galactic_shards.cmp(game.dark_spice_price[id]) >= 0) {
                const price_base = [2, 5, 9, 48, 105, 190]
                const price_scaling = [2, 3, 4, 6, 7, 8]

                game.galactic_shards = Decimal.max(
                    game.galactic_shards.sub(game.dark_spice_price[id]),
                    0
                )
                game.dark_spice_gen[id] = game.dark_spice_gen[id].add(1)
                game.dark_spice_bought[id] += 1n
                game.dark_spice_price[id] = fib(
                    price_base[id] +
                        price_scaling[id] *
                            game.dark_spice_bought[id].toString(),
                    true
                )

                game.dark_spice_boost[id] = Decimal.max(
                    Decimal.pow(phi, game.dark_spice_bought[id].toString()).div(
                        phi
                    ),
                    1
                )

                if (!entry_unlocked[13] && id === 0) entry_unlock(13)
            }
            break
    }
}

function buy_until10(color, id, budget) {
    let n = 0
    let price = 0
    switch (color) {
        case "red":
            n = 10n - (game.red_spice_bought[id] % 10n)

            price = game.red_spice_price[id]
                .mul(1 - 1.2 ** n.toString())
                .div(-0.2)

            if (game.red_spice.cmp(price) >= 0) {
                game.red_spice = Decimal.max(game.red_spice.sub(price), 0)
                game.red_spice_price[id] = game.red_spice_price[id].mul(
                    1.2 ** n.toString()
                )
                game.red_spice_gen[id] = game.red_spice_gen[id].add(
                    n.toString()
                )
                game.red_spice_bought[id] += n

                let red_bought = game.red_spice_bought[id] / 10n + 1n
                game.red_spice_boost[id] = new Decimal(
                    red_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.red_spice_boost[id] = new Decimal(
                        red_bought.toString()
                    )

                if (game.red_spice.cmp(0) < 0) game.red_spice = new Decimal(0)
            }
            break
        case "yellow":
            n = 10n - (game.yellow_spice_bought[id] % 10n)

            price = game.yellow_spice_price[id]
                .mul(1 - 1.3 ** n.toString())
                .div(-0.3)

            if (game.yellow_spice.cmp(price) >= 0) {
                game.yellow_spice = Decimal.max(game.yellow_spice.sub(price), 0)
                game.yellow_spice_price[id] = game.yellow_spice_price[id].mul(
                    1.3 ** n.toString()
                )
                game.yellow_spice_gen[id] = game.yellow_spice_gen[id].add(
                    n.toString()
                )
                game.yellow_spice_bought[id] += n

                let yellow_bought = game.yellow_spice_bought[id] / 10n + 1n
                game.yellow_spice_boost[id] = new Decimal(
                    yellow_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.yellow_spice_boost[id] = new Decimal(
                        yellow_bought.toString()
                    )

                if (game.yellow_spice.cmp(0) < 0)
                    game.yellow_spice = new Decimal(0)
            }
            break
        case "green":
            n = 10n - (game.green_spice_bought[id] % 10n)

            price = game.green_spice_price[id]
                .mul(1 - 1.4 ** n.toString())
                .div(-0.4)

            if (game.green_spice.cmp(price) >= 0) {
                game.green_spice = Decimal.max(game.green_spice.sub(price), 0)
                game.green_spice_price[id] = game.green_spice_price[id].mul(
                    1.4 ** n.toString()
                )
                game.green_spice_gen[id] = game.green_spice_gen[id].add(
                    n.toString()
                )
                game.green_spice_bought[id] += n

                let green_bought = game.green_spice_bought[id] / 10n + 1n
                game.green_spice_boost[id] = new Decimal(
                    green_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.green_spice_boost[id] = new Decimal(
                        green_bought.toString()
                    )

                if (game.green_spice.cmp(0) < 0)
                    game.green_spice = new Decimal(0)
            }
            break
        case "blue":
            n = 10n - (game.blue_spice_bought[id] % 10n)

            price = game.blue_spice_price[id]
                .mul(1 - 1.5 ** n.toString())
                .div(-0.5)

            if (game.blue_spice.cmp(price) >= 0) {
                game.blue_spice = Decimal.max(game.blue_spice.sub(price), 0)
                game.blue_spice_price[id] = game.blue_spice_price[id].mul(
                    1.5 ** n.toString()
                )
                game.blue_spice_gen[id] = game.blue_spice_gen[id].add(
                    n.toString()
                )
                game.blue_spice_bought[id] += n

                let blue_bought = game.blue_spice_bought[id] / 10n + 1n
                game.blue_spice_boost[id] = new Decimal(
                    blue_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.blue_spice_boost[id] = new Decimal(
                        blue_bought.toString()
                    )

                if (game.blue_spice.cmp(0) < 0) game.blue_spice = new Decimal(0)
            }
            break
        case "pink":
            n = 10n - (game.pink_spice_bought[id] % 10n)

            price = game.pink_spice_price[id]
                .mul(1 - 1.6 ** n.toString())
                .div(-0.6)

            if (game.pink_spice.cmp(price) >= 0) {
                game.pink_spice = Decimal.max(game.pink_spice.sub(price), 0)
                game.pink_spice_price[id] = game.pink_spice_price[id].mul(
                    1.6 ** n.toString()
                )
                game.pink_spice_gen[id] = game.pink_spice_gen[id].add(
                    n.toString()
                )
                game.pink_spice_bought[id] += n

                let pink_bought = game.pink_spice_bought[id] / 10n + 1n
                game.pink_spice_boost[id] = new Decimal(
                    pink_bought.toString()
                ).pow(game.prestige_bought[3] + 1)
                if (
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 12
                )
                    game.pink_spice_boost[id] = new Decimal(
                        pink_bought.toString()
                    )

                if (game.pink_spice.cmp(0) < 0) game.pink_spice = new Decimal(0)
            }
            break
        case "crystal":
            n = 5n - (game.crystal_spice_bought[id] % 5n)

            price = game.crystal_spice_price[id]
                .mul(1 - 2 ** n.toString())
                .div(-1)

            if (game.rainbow_spice.cmp(price) >= 0) {
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(price),
                    0
                )
                game.crystal_spice_price[id] = game.crystal_spice_price[id].mul(
                    2 ** n.toString()
                )
                game.crystal_spice_gen[id] = game.crystal_spice_gen[id].add(
                    n.toString()
                )
                game.crystal_spice_bought[id] += n

                let crystal_bought = game.crystal_spice_bought[id] / 5n
                game.crystal_spice_boost[id] = Decimal.pow(
                    2,
                    crystal_bought.toString()
                )
            }
            break
        case "arcane":
            if (game.ascend_complete[0] && game.ascend_bought[16]) {
                n = 3n - (game.arcane_spice_bought[id] % 3n)

                price = game.arcane_spice_price[id]
                    .mul(1 - 3 ** n.toString())
                    .div(-2)
                    .round()

                if (game.ansuz.cmp(price) >= 0) {
                    game.ansuz = Decimal.max(game.ansuz.sub(price), 0)
                    game.arcane_spice_price[id] = game.arcane_spice_price[
                        id
                    ].mul(3 ** n.toString())
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(
                        n.toString()
                    )
                    game.arcane_spice_bought[id] += n

                    let arcane_bought = game.arcane_spice_bought[id] / 3n
                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )

                    game.autods_budget = new Decimal(0)
                }
            }
            break
    }
}

function buy_strengthener(color) {
    let a = 10
    switch (game.prestige_bought[9]) {
        case 0:
            a = 10
            break
        case 1:
            a = 8
            break
        case 2:
            a = 6
            break
        case 3:
            a = 4
            break
        case 4:
            a = 3
            break
    }
    switch (color) {
        case "red":
            if (game.red_spice.cmp(game.red_strengthener_price) >= 0) {
                game.red_spice = Decimal.max(
                    game.red_spice.sub(game.red_strengthener_price),
                    0
                )
                game.red_strengthener_price =
                    game.red_strengthener_price.mul(10000)
                if (game.red_strengthener >= 25)
                    game.red_strengthener_price =
                        game.red_strengthener_price.mul(
                            Decimal.pow(a, game.red_strengthener - 24)
                        )
                game.red_strengthener += 1

                if (game.red_spice.cmp(0) < 0) game.red_spice = new Decimal(0)
            }
            break
        case "yellow":
            if (game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0) {
                game.yellow_spice = Decimal.max(
                    game.yellow_spice.sub(game.yellow_strengthener_price),
                    0
                )
                game.yellow_strengthener_price =
                    game.yellow_strengthener_price.mul(10000)
                if (game.yellow_strengthener >= 25)
                    game.yellow_strengthener_price =
                        game.yellow_strengthener_price.mul(
                            Decimal.pow(a, game.yellow_strengthener - 24)
                        )
                game.yellow_strengthener += 1

                if (game.yellow_spice.cmp(0) < 0)
                    game.yellow_spice = new Decimal(0)
            }
            break
        case "green":
            if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
                game.green_spice = Decimal.max(
                    game.green_spice.sub(game.green_strengthener_price),
                    0
                )
                game.green_strengthener_price =
                    game.green_strengthener_price.mul(10000)
                if (game.green_strengthener >= 25)
                    game.green_strengthener_price =
                        game.green_strengthener_price.mul(
                            Decimal.pow(a, game.green_strengthener - 24)
                        )
                game.green_strengthener += 1

                if (game.green_spice.cmp(0) < 0)
                    game.green_spice = new Decimal(0)
            }
            break
        case "blue":
            if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
                game.blue_spice = Decimal.max(
                    game.blue_spice.sub(game.blue_strengthener_price),
                    0
                )
                game.blue_strengthener_price =
                    game.blue_strengthener_price.mul(10000)
                if (game.blue_strengthener >= 25)
                    game.blue_strengthener_price =
                        game.blue_strengthener_price.mul(
                            Decimal.pow(a, game.blue_strengthener - 24)
                        )
                game.blue_strengthener += 1

                if (game.blue_spice.cmp(0) < 0) game.blue_spice = new Decimal(0)
            }
            break
        case "pink":
            if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
                game.pink_spice = Decimal.max(
                    game.pink_spice.sub(game.pink_strengthener_price),
                    0
                )
                game.pink_strengthener_price =
                    game.pink_strengthener_price.mul(10000)
                if (game.pink_strengthener >= 25)
                    game.pink_strengthener_price =
                        game.pink_strengthener_price.mul(
                            Decimal.pow(a, game.pink_strengthener - 24)
                        )
                game.pink_strengthener += 1

                if (game.pink_spice.cmp(0) < 0) game.pink_spice = new Decimal(0)
            }
            break
        case "crystal":
            if (game.rainbow_spice.cmp(game.crystal_strengthener_price) >= 0) {
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(game.crystal_strengthener_price),
                    0
                )
                game.crystal_strengthener_price =
                    game.crystal_strengthener_price.mul(64)
                game.crystal_strengthener += 1
            }
            break
        case "arcane":
            if (
                game.ascend_complete[0] &&
                game.ascend_bought[16] &&
                game.ansuz.cmp(game.arcane_strengthener_price) >= 0
            ) {
                game.ansuz = Decimal.max(
                    game.ansuz.sub(game.arcane_strengthener_price.round()),
                    0
                )
                game.arcane_strengthener_price =
                    game.arcane_strengthener_price.mul(19683)
                game.arcane_strengthener += 1

                game.autods_budget = new Decimal(0)

                if (
                    game.research_complete[15] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    game.free_enchantment =
                        game.arcane_enchantment / 10n +
                        BigInt(game.arcane_strengthener) * 10n
                    if (
                        game.research_complete[27] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        let collapse_free = BigInt(game.collapse) * 100n
                        if (game.collapse >= 100000)
                            collapse_free = BigInt(
                                Math.floor(
                                    5000000 *
                                        ((game.collapse - 87500) / 50000) **
                                            0.5 +
                                        7500000
                                )
                            )
                        if (game.collapse >= 1337500)
                            collapse_free =
                                BigInt(game.collapse) * 10n + 19125000n
                        if (collapse_free > game.arcane_enchantment / 2n)
                            collapse_free = game.arcane_enchantment / 2n

                        game.free_enchantment += collapse_free
                    }
                }
            }
            break
        case "dark":
            if (game.galactic_shards.cmp(game.dark_strengthener_price) >= 0) {
                game.galactic_shards = Decimal.max(
                    game.galactic_shards.sub(game.dark_strengthener_price),
                    0
                )
                game.dark_strengthener += 1
                if (game.dark_strengthener >= 14)
                    game.dark_strengthener_price = fib(
                        19 * game.dark_strengthener - 84,
                        true
                    )
                else
                    game.dark_strengthener_price = fib(
                        (game.dark_strengthener ** 2 +
                            9 * game.dark_strengthener) /
                            2 +
                            21,
                        true
                    )
            }
            break
    }
}

function max_all(color) {
    let n = 0
    let a = 10
    switch (game.prestige_bought[9]) {
        case 0:
            a = 10
            break
        case 1:
            a = 8
            break
        case 2:
            a = 6
            break
        case 3:
            a = 4
            break
        case 4:
            a = 3
            break
    }
    if (game.ascend_complete[2] && game.ascend_bought[24]) a = 2
    let b = (49 * Math.log(a) - 2 * Math.log(10000)) / (2 * Math.log(a))
    let c =
        Math.log(a) ** 2 -
        196 * Math.log(10000) * Math.log(a) +
        4 * Math.log(10000) ** 2

    let generators = 1
    let budget = new Decimal(0)
    switch (color) {
        case "red":
            if (game.red_strengthener < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.red_spice
                                .mul(-9999)
                                .div(game.red_strengthener_price)
                        )
                        .log(10) / 4
                )
                if (game.red_strengthener + n >= 25)
                    n = 25 - game.red_strengthener
                if (n > 0) {
                    let price = game.red_strengthener_price
                        .mul(new Decimal(1).sub(new Decimal(10000).pow(n)))
                        .div(-9999)
                    game.red_spice = Decimal.max(game.red_spice.sub(price), 0)
                    game.red_strengthener_price =
                        game.red_strengthener_price.mul(
                            new Decimal(10000).pow(n)
                        )
                    game.red_strengthener += n
                }
            }
            if (game.red_strengthener >= 25) {
                let price1 = game.red_strengthener_price.add(
                    Decimal.pow(10000, game.red_strengthener + 1)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.red_strengthener - 24) *
                                    (game.red_strengthener - 23)) /
                                    2
                            )
                        )
                        .mul(1000000)
                )
                let price2 = price1.add(
                    Decimal.pow(10000, game.red_strengthener + 2)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.red_strengthener - 23) *
                                    (game.red_strengthener - 22)) /
                                    2
                            )
                        )
                        .mul(1000000)
                )
                let price3 = price2.add(
                    Decimal.pow(10000, game.red_strengthener + 3)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.red_strengthener - 22) *
                                    (game.red_strengthener - 21)) /
                                    2
                            )
                        )
                        .mul(1000000)
                )

                if (game.red_spice.cmp(game.red_strengthener_price) >= 0) {
                    if (game.red_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.red_spice.div(1000000).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(1000000)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(1000000)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(1000000)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(1000000)
                        )
                        game.red_spice = Decimal.max(
                            game.red_spice.sub(price),
                            0
                        )
                        game.red_strengthener = n + 1
                        game.red_strengthener_price = Decimal.pow(10000, n + 1)
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(1000000)
                    } else if (game.red_spice.cmp(price2) >= 0) {
                        buy_strengthener("red")
                        buy_strengthener("red")
                        buy_strengthener("red")
                    } else if (game.red_spice.cmp(price1) >= 0) {
                        buy_strengthener("red")
                        buy_strengthener("red")
                    } else {
                        buy_strengthener("red")
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.red_spice.cmp(game.red_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.red_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let red_budget = budget
                if (
                    game.red_spice_bought[i] === 0n &&
                    red_budget.cmp(game.red_spice_price[i]) >= 0
                ) {
                    game.red_spice = Decimal.max(
                        game.red_spice.sub(game.red_spice_price[i]),
                        0
                    )
                    red_budget = Decimal.max(
                        red_budget.sub(game.red_spice_price[i]),
                        0
                    )
                    game.red_spice_price[i] = game.red_spice_price[i].mul(1.2)
                    game.red_spice_gen[i] = game.red_spice_gen[i].add(1)
                    game.red_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                red_budget
                                    .mul(-0.2)
                                    .div(game.red_spice_price[i])
                            )
                            .log(10) / Math.log10(1.2)
                    )
                )
                if (game.red_spice_bought[i] + m >= 10n)
                    m =
                        ((game.red_spice_bought[i] + m) / 10n) * 10n -
                        game.red_spice_bought[i]
                if (m > 0n) {
                    let price = game.red_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.2).pow(m.toString())
                            )
                        )
                        .div(-0.2)
                    game.red_spice = Decimal.max(game.red_spice.sub(price), 0)
                    game.red_spice_price[i] = game.red_spice_price[i].mul(
                        new Decimal(1.2).pow(m.toString())
                    )
                    game.red_spice_gen[i] = game.red_spice_gen[i].add(
                        m.toString()
                    )
                    game.red_spice_bought[i] += m

                    let red_bought = game.red_spice_bought[i] / 10n + 1n
                    game.red_spice_boost[i] = new Decimal(
                        red_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.red_spice_boost[i] = new Decimal(
                            red_bought.toString()
                        )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.red_spice_bought[i] === 0n &&
                    game.red_spice.cmp(game.red_spice_price[i]) >= 0
                ) {
                    game.red_spice = Decimal.max(
                        game.red_spice.sub(game.red_spice_price[i]),
                        0
                    )
                    game.red_spice_price[i] = game.red_spice_price[i].mul(1.2)
                    game.red_spice_gen[i] = game.red_spice_gen[i].add(1)
                    game.red_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.red_spice
                                    .mul(-0.2)
                                    .div(game.red_spice_price[i])
                            )
                            .log(10) / Math.log10(1.2)
                    )
                )
                if (game.red_spice_bought[i] + m >= 10n)
                    m =
                        ((game.red_spice_bought[i] + m) / 10n) * 10n -
                        game.red_spice_bought[i]
                if (m > 0n) {
                    let price = game.red_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.2).pow(m.toString())
                            )
                        )
                        .div(-0.2)
                    game.red_spice = Decimal.max(game.red_spice.sub(price), 0)
                    game.red_spice_price[i] = game.red_spice_price[i].mul(
                        new Decimal(1.2).pow(m.toString())
                    )
                    game.red_spice_gen[i] = game.red_spice_gen[i].add(
                        m.toString()
                    )
                    game.red_spice_bought[i] += m

                    let red_bought = game.red_spice_bought[i] / 10n + 1n
                    game.red_spice_boost[i] = new Decimal(
                        red_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.red_spice_boost[i] = new Decimal(
                            red_bought.toString()
                        )
                }
            }

            if (game.red_spice.cmp(0) < 0) game.red_spice = new Decimal(0)
            break
        case "yellow":
            if (game.yellow_strengthener < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.yellow_spice
                                .mul(-9999)
                                .div(game.yellow_strengthener_price)
                        )
                        .log(10) / 4
                )
                if (game.yellow_strengthener + n >= 25)
                    n = 25 - game.yellow_strengthener
                if (n > 0) {
                    let price = game.yellow_strengthener_price
                        .mul(new Decimal(1).sub(new Decimal(10000).pow(n)))
                        .div(-9999)
                    game.yellow_spice = Decimal.max(
                        game.yellow_spice.sub(price),
                        0
                    )
                    game.yellow_strengthener_price =
                        game.yellow_strengthener_price.mul(
                            new Decimal(10000).pow(n)
                        )
                    game.yellow_strengthener += n
                }
            }
            if (game.yellow_strengthener >= 25) {
                let price1 = game.yellow_strengthener_price.add(
                    Decimal.pow(10000, game.yellow_strengthener + 1)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.yellow_strengthener - 24) *
                                    (game.yellow_strengthener - 23)) /
                                    2
                            )
                        )
                        .mul(2e7)
                )
                let price2 = price1.add(
                    Decimal.pow(10000, game.yellow_strengthener + 2)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.yellow_strengthener - 23) *
                                    (game.yellow_strengthener - 22)) /
                                    2
                            )
                        )
                        .mul(2e7)
                )
                let price3 = price2.add(
                    Decimal.pow(10000, game.yellow_strengthener + 3)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.yellow_strengthener - 22) *
                                    (game.yellow_strengthener - 21)) /
                                    2
                            )
                        )
                        .mul(2e7)
                )

                if (
                    game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0
                ) {
                    if (game.yellow_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.yellow_spice.div(2e7).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(2e7)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(2e7)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(2e7)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(2e7)
                        )
                        game.yellow_spice = Decimal.max(
                            game.yellow_spice.sub(price),
                            0
                        )
                        game.yellow_strengthener = n + 1
                        game.yellow_strengthener_price = Decimal.pow(
                            10000,
                            n + 1
                        )
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(2e7)
                    } else if (game.yellow_spice.cmp(price2) >= 0) {
                        buy_strengthener("yellow")
                        buy_strengthener("yellow")
                        buy_strengthener("yellow")
                    } else if (game.yellow_spice.cmp(price1) >= 0) {
                        buy_strengthener("yellow")
                        buy_strengthener("yellow")
                    } else {
                        buy_strengthener("yellow")
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.yellow_spice.cmp(game.yellow_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.yellow_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let yellow_budget = budget
                if (
                    game.yellow_spice_bought[i] === 0n &&
                    yellow_budget.cmp(game.yellow_spice_price[i]) >= 0
                ) {
                    game.yellow_spice = Decimal.max(
                        game.yellow_spice.sub(game.yellow_spice_price[i]),
                        0
                    )
                    yellow_budget = Decimal.max(
                        yellow_budget.sub(game.yellow_spice_price[i]),
                        0
                    )
                    game.yellow_spice_price[i] =
                        game.yellow_spice_price[i].mul(1.3)
                    game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(1)
                    game.yellow_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                yellow_budget
                                    .mul(-0.3)
                                    .div(game.yellow_spice_price[i])
                            )
                            .log(10) / Math.log10(1.3)
                    )
                )
                if (game.yellow_spice_bought[i] + m >= 10n)
                    m =
                        ((game.yellow_spice_bought[i] + m) / 10n) * 10n -
                        game.yellow_spice_bought[i]
                if (m > 0n) {
                    let price = game.yellow_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.3).pow(m.toString())
                            )
                        )
                        .div(-0.3)
                    game.yellow_spice = Decimal.max(
                        game.yellow_spice.sub(price),
                        0
                    )
                    game.yellow_spice_price[i] = game.yellow_spice_price[i].mul(
                        new Decimal(1.3).pow(m.toString())
                    )
                    game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                        m.toString()
                    )
                    game.yellow_spice_bought[i] += m

                    let yellow_bought = game.yellow_spice_bought[i] / 10n + 1n
                    game.yellow_spice_boost[i] = new Decimal(
                        yellow_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.yellow_spice_boost[i] = new Decimal(
                            yellow_bought.toString()
                        )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.yellow_spice_bought[i] === 0n &&
                    game.yellow_spice.cmp(game.yellow_spice_price[i]) >= 0
                ) {
                    game.yellow_spice = Decimal.max(
                        game.yellow_spice.sub(game.yellow_spice_price[i]),
                        0
                    )
                    game.yellow_spice_price[i] =
                        game.yellow_spice_price[i].mul(1.3)
                    game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(1)
                    game.yellow_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.yellow_spice
                                    .mul(-0.3)
                                    .div(game.yellow_spice_price[i])
                            )
                            .log(10) / Math.log10(1.3)
                    )
                )
                if (game.yellow_spice_bought[i] + m >= 10n)
                    m =
                        ((game.yellow_spice_bought[i] + m) / 10n) * 10n -
                        game.yellow_spice_bought[i]
                if (m > 0n) {
                    let price = game.yellow_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.3).pow(m.toString())
                            )
                        )
                        .div(-0.3)
                    game.yellow_spice = Decimal.max(
                        game.yellow_spice.sub(price),
                        0
                    )
                    game.yellow_spice_price[i] = game.yellow_spice_price[i].mul(
                        new Decimal(1.3).pow(m.toString())
                    )
                    game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(
                        m.toString()
                    )
                    game.yellow_spice_bought[i] += m

                    let yellow_bought = game.yellow_spice_bought[i] / 10n + 1n
                    game.yellow_spice_boost[i] = new Decimal(
                        yellow_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.yellow_spice_boost[i] = new Decimal(
                            yellow_bought.toString()
                        )
                }
            }

            if (game.yellow_spice.cmp(0) < 0) game.yellow_spice = new Decimal(0)
            break
        case "green":
            if (game.green_strengthener < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.green_spice
                                .mul(-9999)
                                .div(game.green_strengthener_price)
                        )
                        .log(10) / 4
                )
                if (game.green_strengthener + n >= 25)
                    n = 25 - game.green_strengthener
                if (n > 0) {
                    let price = game.green_strengthener_price
                        .mul(new Decimal(1).sub(new Decimal(10000).pow(n)))
                        .div(-9999)
                    game.green_spice = Decimal.max(
                        game.green_spice.sub(price),
                        0
                    )
                    game.green_strengthener_price =
                        game.green_strengthener_price.mul(
                            new Decimal(10000).pow(n)
                        )
                    game.green_strengthener += n
                }
            }
            if (game.green_strengthener >= 25) {
                let price1 = game.green_strengthener_price.add(
                    Decimal.pow(10000, game.green_strengthener + 1)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.green_strengthener - 24) *
                                    (game.green_strengthener - 23)) /
                                    2
                            )
                        )
                        .mul(4e8)
                )
                let price2 = price1.add(
                    Decimal.pow(10000, game.green_strengthener + 2)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.green_strengthener - 23) *
                                    (game.green_strengthener - 22)) /
                                    2
                            )
                        )
                        .mul(4e8)
                )
                let price3 = price2.add(
                    Decimal.pow(10000, game.green_strengthener + 3)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.green_strengthener - 22) *
                                    (game.green_strengthener - 21)) /
                                    2
                            )
                        )
                        .mul(4e8)
                )

                if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
                    if (game.green_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.green_spice.div(4e8).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(4e8)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(4e8)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(4e8)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(4e8)
                        )
                        game.green_spice = Decimal.max(
                            game.green_spice.sub(price),
                            0
                        )
                        game.green_strengthener = n + 1
                        game.green_strengthener_price = Decimal.pow(
                            10000,
                            n + 1
                        )
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(4e8)
                    } else if (game.green_spice.cmp(price2) >= 0) {
                        buy_strengthener("green")
                        buy_strengthener("green")
                        buy_strengthener("green")
                    } else if (game.green_spice.cmp(price1) >= 0) {
                        buy_strengthener("green")
                        buy_strengthener("green")
                    } else {
                        buy_strengthener("green")
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.green_spice.cmp(game.green_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.green_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let green_budget = budget
                if (
                    game.green_spice_bought[i] === 0n &&
                    green_budget.cmp(game.green_spice_price[i]) >= 0
                ) {
                    game.green_spice = Decimal.max(
                        game.green_spice.sub(game.green_spice_price[i]),
                        0
                    )
                    green_budget = Decimal.max(
                        green_budget.sub(game.green_spice_price[i]),
                        0
                    )
                    game.green_spice_price[i] =
                        game.green_spice_price[i].mul(1.4)
                    game.green_spice_gen[i] = game.green_spice_gen[i].add(1)
                    game.green_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                green_budget
                                    .mul(-0.4)
                                    .div(game.green_spice_price[i])
                            )
                            .log(10) / Math.log10(1.4)
                    )
                )
                if (game.green_spice_bought[i] + m >= 10n)
                    m =
                        ((game.green_spice_bought[i] + m) / 10n) * 10n -
                        game.green_spice_bought[i]
                if (m > 0n) {
                    let price = game.green_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.4).pow(m.toString())
                            )
                        )
                        .div(-0.4)
                    game.green_spice = Decimal.max(
                        game.green_spice.sub(price),
                        0
                    )
                    game.green_spice_price[i] = game.green_spice_price[i].mul(
                        new Decimal(1.4).pow(m.toString())
                    )
                    game.green_spice_gen[i] = game.green_spice_gen[i].add(
                        m.toString()
                    )
                    game.green_spice_bought[i] += m

                    let green_bought = game.green_spice_bought[i] / 10n + 1n
                    game.green_spice_boost[i] = new Decimal(
                        green_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.green_spice_boost[i] = new Decimal(
                            green_bought.toString()
                        )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.green_spice_bought[i] === 0n &&
                    game.green_spice.cmp(game.green_spice_price[i]) >= 0
                ) {
                    game.green_spice = Decimal.max(
                        game.green_spice.sub(game.green_spice_price[i]),
                        0
                    )
                    game.green_spice_price[i] =
                        game.green_spice_price[i].mul(1.4)
                    game.green_spice_gen[i] = game.green_spice_gen[i].add(1)
                    game.green_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.green_spice
                                    .mul(-0.4)
                                    .div(game.green_spice_price[i])
                            )
                            .log(10) / Math.log10(1.4)
                    )
                )
                if (game.green_spice_bought[i] + m >= 10n)
                    m =
                        ((game.green_spice_bought[i] + m) / 10n) * 10n -
                        game.green_spice_bought[i]
                if (m > 0n) {
                    let price = game.green_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.4).pow(m.toString())
                            )
                        )
                        .div(-0.4)
                    game.green_spice = Decimal.max(
                        game.green_spice.sub(price),
                        0
                    )
                    game.green_spice_price[i] = game.green_spice_price[i].mul(
                        new Decimal(1.4).pow(m.toString())
                    )
                    game.green_spice_gen[i] = game.green_spice_gen[i].add(
                        m.toString()
                    )
                    game.green_spice_bought[i] += m

                    let green_bought = game.green_spice_bought[i] / 10n + 1n
                    game.green_spice_boost[i] = new Decimal(
                        green_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.green_spice_boost[i] = new Decimal(
                            green_bought.toString()
                        )
                }
            }

            if (game.green_spice.cmp(0) < 0) game.green_spice = new Decimal(0)
            break
        case "blue":
            if (game.blue_strengthener < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.blue_spice
                                .mul(-9999)
                                .div(game.blue_strengthener_price)
                        )
                        .log(10) / 4
                )
                if (game.blue_strengthener + n >= 25)
                    n = 25 - game.blue_strengthener
                if (n > 0) {
                    let price = game.blue_strengthener_price
                        .mul(new Decimal(1).sub(new Decimal(10000).pow(n)))
                        .div(-9999)
                    game.blue_spice = Decimal.max(game.blue_spice.sub(price), 0)
                    game.blue_strengthener_price =
                        game.blue_strengthener_price.mul(
                            new Decimal(10000).pow(n)
                        )
                    game.blue_strengthener += n
                }
            }
            if (game.blue_strengthener >= 25) {
                let price1 = game.blue_strengthener_price.add(
                    Decimal.pow(10000, game.blue_strengthener + 1)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.blue_strengthener - 24) *
                                    (game.blue_strengthener - 23)) /
                                    2
                            )
                        )
                        .mul(8e9)
                )
                let price2 = price1.add(
                    Decimal.pow(10000, game.blue_strengthener + 2)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.blue_strengthener - 23) *
                                    (game.blue_strengthener - 22)) /
                                    2
                            )
                        )
                        .mul(8e9)
                )
                let price3 = price2.add(
                    Decimal.pow(10000, game.blue_strengthener + 3)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.blue_strengthener - 22) *
                                    (game.blue_strengthener - 21)) /
                                    2
                            )
                        )
                        .mul(8e9)
                )

                if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
                    if (game.blue_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.blue_spice.div(8e9).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(8e9)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(8e9)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(8e9)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(8e9)
                        )
                        game.blue_spice = Decimal.max(
                            game.blue_spice.sub(price),
                            0
                        )
                        game.blue_strengthener = n + 1
                        game.blue_strengthener_price = Decimal.pow(10000, n + 1)
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(8e9)
                    } else if (game.blue_spice.cmp(price2) >= 0) {
                        buy_strengthener("blue")
                        buy_strengthener("blue")
                        buy_strengthener("blue")
                    } else if (game.blue_spice.cmp(price1) >= 0) {
                        buy_strengthener("blue")
                        buy_strengthener("blue")
                    } else {
                        buy_strengthener("blue")
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.blue_spice.cmp(game.blue_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.blue_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let blue_budget = budget
                if (
                    game.blue_spice_bought[i] === 0n &&
                    blue_budget.cmp(game.blue_spice_price[i]) >= 0
                ) {
                    game.blue_spice = Decimal.max(
                        game.blue_spice.sub(game.blue_spice_price[i]),
                        0
                    )
                    blue_budget = Decimal.max(
                        blue_budget.sub(game.blue_spice_price[i]),
                        0
                    )
                    game.blue_spice_price[i] = game.blue_spice_price[i].mul(1.5)
                    game.blue_spice_gen[i] = game.blue_spice_gen[i].add(1)
                    game.blue_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                blue_budget
                                    .mul(-0.5)
                                    .div(game.blue_spice_price[i])
                            )
                            .log(10) / Math.log10(1.5)
                    )
                )
                if (game.blue_spice_bought[i] + m >= 10n)
                    m =
                        ((game.blue_spice_bought[i] + m) / 10n) * 10n -
                        game.blue_spice_bought[i]
                if (m > 0n) {
                    let price = game.blue_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.5).pow(m.toString())
                            )
                        )
                        .div(-0.5)
                    game.blue_spice = Decimal.max(game.blue_spice.sub(price), 0)
                    game.blue_spice_price[i] = game.blue_spice_price[i].mul(
                        new Decimal(1.5).pow(m.toString())
                    )
                    game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                        m.toString()
                    )
                    game.blue_spice_bought[i] += m

                    let blue_bought = game.blue_spice_bought[i] / 10n + 1n
                    game.blue_spice_boost[i] = new Decimal(
                        blue_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.blue_spice_boost[i] = new Decimal(
                            blue_bought.toString()
                        )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.blue_spice_bought[i] === 0n &&
                    game.blue_spice.cmp(game.blue_spice_price[i]) >= 0
                ) {
                    game.blue_spice = Decimal.max(
                        game.blue_spice.sub(game.blue_spice_price[i]),
                        0
                    )
                    game.blue_spice_price[i] = game.blue_spice_price[i].mul(1.5)
                    game.blue_spice_gen[i] = game.blue_spice_gen[i].add(1)
                    game.blue_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.blue_spice
                                    .mul(-0.5)
                                    .div(game.blue_spice_price[i])
                            )
                            .log(10) / Math.log10(1.5)
                    )
                )
                if (game.blue_spice_bought[i] + m >= 10n)
                    m =
                        ((game.blue_spice_bought[i] + m) / 10n) * 10n -
                        game.blue_spice_bought[i]
                if (m > 0n) {
                    let price = game.blue_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.5).pow(m.toString())
                            )
                        )
                        .div(-0.5)
                    game.blue_spice = Decimal.max(game.blue_spice.sub(price), 0)
                    game.blue_spice_price[i] = game.blue_spice_price[i].mul(
                        new Decimal(1.5).pow(m.toString())
                    )
                    game.blue_spice_gen[i] = game.blue_spice_gen[i].add(
                        m.toString()
                    )
                    game.blue_spice_bought[i] += m

                    let blue_bought = game.blue_spice_bought[i] / 10n + 1n
                    game.blue_spice_boost[i] = new Decimal(
                        blue_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.blue_spice_boost[i] = new Decimal(
                            blue_bought.toString()
                        )
                }
            }

            if (game.blue_spice.cmp(0) < 0) game.blue_spice = new Decimal(0)
            break
        case "pink":
            if (game.pink_strengthener < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.pink_spice
                                .mul(-9999)
                                .div(game.pink_strengthener_price)
                        )
                        .log(10) / 4
                )
                if (game.pink_strengthener + n >= 25)
                    n = 25 - game.pink_strengthener
                if (n > 0) {
                    let price = game.pink_strengthener_price
                        .mul(new Decimal(1).sub(new Decimal(10000).pow(n)))
                        .div(-9999)
                    game.pink_spice = Decimal.max(game.pink_spice.sub(price), 0)
                    game.pink_strengthener_price =
                        game.pink_strengthener_price.mul(
                            new Decimal(10000).pow(n)
                        )
                    game.pink_strengthener += n
                }
            }
            if (game.pink_strengthener >= 25) {
                let price1 = game.pink_strengthener_price.add(
                    Decimal.pow(10000, game.pink_strengthener + 1)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.pink_strengthener - 24) *
                                    (game.pink_strengthener - 23)) /
                                    2
                            )
                        )
                        .mul(1.6e11)
                )
                let price2 = price1.add(
                    Decimal.pow(10000, game.pink_strengthener + 2)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.pink_strengthener - 23) *
                                    (game.pink_strengthener - 22)) /
                                    2
                            )
                        )
                        .mul(1.6e11)
                )
                let price3 = price2.add(
                    Decimal.pow(10000, game.pink_strengthener + 3)
                        .mul(
                            Decimal.pow(
                                a,
                                ((game.pink_strengthener - 22) *
                                    (game.pink_strengthener - 21)) /
                                    2
                            )
                        )
                        .mul(1.6e11)
                )

                if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
                    if (game.pink_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.pink_spice.div(1.6e11).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(1.6e11)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(1.6e11)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(1.6e11)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(1.6e11)
                        )
                        game.pink_spice = Decimal.max(
                            game.pink_spice.sub(price),
                            new Decimal(0)
                        )
                        game.pink_strengthener = n + 1
                        game.pink_strengthener_price = Decimal.pow(10000, n + 1)
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(1.6e11)
                    } else if (game.pink_spice.cmp(price2) >= 0) {
                        buy_strengthener("pink")
                        buy_strengthener("pink")
                        buy_strengthener("pink")
                    } else if (game.pink_spice.cmp(price1) >= 0) {
                        buy_strengthener("pink")
                        buy_strengthener("pink")
                    } else {
                        buy_strengthener("pink")
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.pink_spice.cmp(game.pink_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.pink_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let pink_budget = budget
                if (
                    game.pink_spice_bought[i] === 0n &&
                    pink_budget.cmp(game.pink_spice_price[i]) >= 0
                ) {
                    game.pink_spice = Decimal.max(
                        game.pink_spice.sub(game.pink_spice_price[i]),
                        0
                    )
                    pink_budget = Decimal.max(
                        pink_budget.sub(game.pink_spice_price[i]),
                        0
                    )
                    game.pink_spice_price[i] = game.pink_spice_price[i].mul(1.6)
                    game.pink_spice_gen[i] = game.pink_spice_gen[i].add(1)
                    game.pink_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                pink_budget
                                    .mul(-0.6)
                                    .div(game.pink_spice_price[i])
                            )
                            .log(10) / Math.log10(1.6)
                    )
                )
                if (game.pink_spice_bought[i] + m >= 10n)
                    m =
                        ((game.pink_spice_bought[i] + m) / 10n) * 10n -
                        game.pink_spice_bought[i]
                if (m > 0n) {
                    let price = game.pink_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.6).pow(m.toString())
                            )
                        )
                        .div(-0.6)
                    game.pink_spice = Decimal.max(game.pink_spice.sub(price), 0)
                    game.pink_spice_price[i] = game.pink_spice_price[i].mul(
                        new Decimal(1.6).pow(m.toString())
                    )
                    game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                        m.toString()
                    )
                    game.pink_spice_bought[i] += m

                    let pink_bought = game.pink_spice_bought[i] / 10n + 1n
                    game.pink_spice_boost[i] = new Decimal(
                        pink_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.pink_spice_boost[i] = new Decimal(
                            pink_bought.toString()
                        )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.pink_spice_bought[i] === 0n &&
                    game.pink_spice.cmp(game.pink_spice_price[i]) >= 0
                ) {
                    game.pink_spice = Decimal.max(
                        game.pink_spice.sub(game.pink_spice_price[i]),
                        0
                    )
                    game.pink_spice_price[i] = game.pink_spice_price[i].mul(1.6)
                    game.pink_spice_gen[i] = game.pink_spice_gen[i].add(1)
                    game.pink_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.pink_spice
                                    .mul(-0.6)
                                    .div(game.pink_spice_price[i])
                            )
                            .log(10) / Math.log10(1.6)
                    )
                )
                if (game.pink_spice_bought[i] + m >= 10n)
                    m =
                        ((game.pink_spice_bought[i] + m) / 10n) * 10n -
                        game.pink_spice_bought[i]
                if (m > 0n) {
                    let price = game.pink_spice_price[i]
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(1.6).pow(m.toString())
                            )
                        )
                        .div(-0.6)
                    game.pink_spice = Decimal.max(game.pink_spice.sub(price), 0)
                    game.pink_spice_price[i] = game.pink_spice_price[i].mul(
                        new Decimal(1.6).pow(m.toString())
                    )
                    game.pink_spice_gen[i] = game.pink_spice_gen[i].add(
                        m.toString()
                    )
                    game.pink_spice_bought[i] += m

                    let pink_bought = game.pink_spice_bought[i] / 10n + 1n
                    game.pink_spice_boost[i] = new Decimal(
                        pink_bought.toString()
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 12
                    )
                        game.pink_spice_boost[i] = new Decimal(
                            pink_bought.toString()
                        )
                }
            }

            if (game.pink_spice.cmp(0) < 0) game.pink_spice = new Decimal(0)
            break
        case "crystal":
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.rainbow_spice
                            .mul(-63)
                            .div(game.crystal_strengthener_price)
                    )
                    .log(10) / Math.log10(64)
            )
            if (n > 0) {
                let price = game.crystal_strengthener_price
                    .mul(new Decimal(1).sub(new Decimal(64).pow(n)))
                    .div(-63)
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(price),
                    0
                )
                game.crystal_strengthener_price =
                    game.crystal_strengthener_price.mul(new Decimal(64).pow(n))
                game.crystal_strengthener += n
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.rainbow_spice.cmp(game.crystal_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.rainbow_spice.div(generators)
            for (let i = 5; i >= 0; i--) {
                let rainbow_budget = budget
                if (
                    game.crystal_spice_bought[i] === 0n &&
                    rainbow_budget.cmp(game.crystal_spice_price[i]) >= 0
                ) {
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(game.crystal_spice_price[i]),
                        0
                    )
                    rainbow_budget = Decimal.max(
                        rainbow_budget.sub(game.crystal_spice_price[i]),
                        0
                    )
                    game.crystal_spice_price[i] =
                        game.crystal_spice_price[i].mul(2)
                    game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(1)
                    game.crystal_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                rainbow_budget
                                    .mul(-1)
                                    .div(game.crystal_spice_price[i])
                            )
                            .log(10) / Math.log10(2)
                    )
                )
                if (game.crystal_spice_bought[i] + m >= 5n)
                    m =
                        ((game.crystal_spice_bought[i] + m) / 5n) * 5n -
                        game.crystal_spice_bought[i]
                if (m > 0) {
                    let price = game.crystal_spice_price[i]
                        .mul(
                            new Decimal(1).sub(new Decimal(2).pow(m.toString()))
                        )
                        .div(-1)
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(price),
                        0
                    )
                    game.crystal_spice_price[i] = game.crystal_spice_price[
                        i
                    ].mul(new Decimal(2).pow(m.toString()))
                    game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                        m.toString()
                    )
                    game.crystal_spice_bought[i] += m

                    let crystal_bought = game.crystal_spice_bought[i] / 5n
                    game.crystal_spice_boost[i] = Decimal.pow(
                        2,
                        crystal_bought.toString()
                    )
                }
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.crystal_spice_bought[i] === 0n &&
                    game.rainbow_spice.cmp(game.crystal_spice_price[i]) >= 0
                ) {
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(game.crystal_spice_price[i]),
                        0
                    )
                    game.crystal_spice_price[i] =
                        game.crystal_spice_price[i].mul(2)
                    game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(1)
                    game.crystal_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.rainbow_spice
                                    .mul(-1)
                                    .div(game.crystal_spice_price[i])
                            )
                            .log(10) / Math.log10(2)
                    )
                )
                if (game.crystal_spice_bought[i] + m >= 5n)
                    m =
                        ((game.crystal_spice_bought[i] + m) / 5n) * 5n -
                        game.crystal_spice_bought[i]
                if (m > 0) {
                    let price = game.crystal_spice_price[i]
                        .mul(
                            new Decimal(1).sub(new Decimal(2).pow(m.toString()))
                        )
                        .div(-1)
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(price),
                        0
                    )
                    game.crystal_spice_price[i] = game.crystal_spice_price[
                        i
                    ].mul(new Decimal(2).pow(m.toString()))
                    game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(
                        m.toString()
                    )
                    game.crystal_spice_bought[i] += m

                    let crystal_bought = game.crystal_spice_bought[i] / 5n
                    game.crystal_spice_boost[i] = Decimal.pow(
                        2,
                        crystal_bought.toString()
                    )
                }
            }
            break
        case "arcane":
            if (game.ascend_complete[0] && game.ascend_bought[16]) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.ansuz
                                .mul(-19682)
                                .div(game.arcane_strengthener_price)
                        )
                        .log(10) / Math.log10(19683)
                )

                if (n > 0) {
                    let price = game.arcane_strengthener_price
                        .mul(1 - 19683 ** n)
                        .div(-19682)
                        .round()
                    game.ansuz = Decimal.max(game.ansuz.sub(price), 0)
                    game.arcane_strengthener_price =
                        game.arcane_strengthener_price.mul(
                            Decimal.pow(19683, n)
                        )
                    game.arcane_strengthener += n

                    game.autods_budget = new Decimal(0)

                    if (
                        game.research_complete[15] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        game.free_enchantment =
                            game.arcane_enchantment / 10n +
                            BigInt(game.arcane_strengthener) * 10n
                        if (
                            game.research_complete[27] >= 1 &&
                            game.collapse_challenge !== 12
                        ) {
                            let collapse_free = BigInt(game.collapse) * 100n
                            if (game.collapse >= 100000)
                                collapse_free = BigInt(
                                    Math.floor(
                                        5000000 *
                                            ((game.collapse - 87500) / 50000) **
                                                0.5 +
                                            7500000
                                    )
                                )
                            if (game.collapse >= 1337500)
                                collapse_free =
                                    BigInt(game.collapse) * 10n + 19125000n
                            if (collapse_free > game.arcane_enchantment / 2n)
                                collapse_free = game.arcane_enchantment / 2n

                            game.free_enchantment += collapse_free
                        }
                    }
                }
                generators = 1
                for (let i = 1; i < 6; i++) {
                    if (game.ansuz.cmp(game.arcane_spice_price[i]) >= 0)
                        generators++
                }
                budget = game.ansuz.div(generators).floor()
                for (let i = 5; i >= 0; i--) {
                    let ansuz_budget = budget
                    if (
                        game.arcane_spice_bought[i] === 0n &&
                        ansuz_budget.cmp(game.arcane_spice_price[i]) >= 0
                    ) {
                        game.ansuz = Decimal.max(
                            game.ansuz.sub(game.arcane_spice_price[i]),
                            0
                        )
                        ansuz_budget = Decimal.max(
                            ansuz_budget.sub(game.arcane_spice_price[i]),
                            0
                        )
                        game.arcane_spice_price[i] =
                            game.arcane_spice_price[i].mul(3)
                        game.arcane_spice_gen[i] =
                            game.arcane_spice_gen[i].add(1)
                        game.arcane_spice_bought[i] += 1n

                        game.autods_budget = new Decimal(0)
                    }
                    let m = BigInt(
                        Math.floor(
                            new Decimal(1)
                                .sub(
                                    ansuz_budget
                                        .mul(-2)
                                        .div(game.arcane_spice_price[i])
                                )
                                .log(10) / Math.log10(3)
                        )
                    )
                    if (game.arcane_spice_bought[i] + m >= 3n)
                        m =
                            ((game.arcane_spice_bought[i] + m) / 3n) * 3n -
                            game.arcane_spice_bought[i]
                    if (m > 0n) {
                        let price = game.arcane_spice_price[i]
                            .mul(
                                new Decimal(1).sub(Decimal.pow(3, m.toString()))
                            )
                            .div(-2)
                        game.ansuz = Decimal.max(game.ansuz.sub(price), 0)
                        game.arcane_spice_price[i] = game.arcane_spice_price[
                            i
                        ].mul(Decimal.pow(3, m.toString()))
                        game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                            m.toString()
                        )
                        game.arcane_spice_bought[i] += m

                        let arcane_bought = game.arcane_spice_bought[i] / 3n
                        game.arcane_spice_boost[i] = Decimal.pow(
                            3,
                            arcane_bought.toString()
                        )

                        game.autods_budget = new Decimal(0)
                    }
                }
                for (let i = 5; i >= 0; i--) {
                    if (
                        game.arcane_spice_bought[i] === 0n &&
                        game.ansuz.cmp(game.arcane_spice_price[i]) >= 0
                    ) {
                        game.ansuz = Decimal.max(
                            game.ansuz.sub(game.arcane_spice_price[i]),
                            0
                        )
                        game.arcane_spice_price[i] =
                            game.arcane_spice_price[i].mul(3)
                        game.arcane_spice_gen[i] =
                            game.arcane_spice_gen[i].add(1)
                        game.arcane_spice_bought[i] += 1n

                        game.autods_budget = new Decimal(0)
                    }
                    let m = BigInt(
                        Math.floor(
                            new Decimal(1)
                                .sub(
                                    game.ansuz
                                        .mul(-2)
                                        .div(game.arcane_spice_price[i])
                                )
                                .log(10) / Math.log10(3)
                        )
                    )
                    if (game.arcane_spice_bought[i] + m >= 3n)
                        m =
                            ((game.arcane_spice_bought[i] + m) / 3n) * 3n -
                            game.arcane_spice_bought[i]
                    if (m > 0n) {
                        let price = game.arcane_spice_price[i]
                            .mul(
                                new Decimal(1).sub(Decimal.pow(3, m.toString()))
                            )
                            .div(-2)
                            .round()
                        game.ansuz = Decimal.max(game.ansuz.sub(price), 0)
                        game.arcane_spice_price[i] = game.arcane_spice_price[
                            i
                        ].mul(Decimal.pow(3, m.toString()))
                        game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                            m.toString()
                        )
                        game.arcane_spice_bought[i] += m

                        let arcane_bought = game.arcane_spice_bought[i] / 3n
                        game.arcane_spice_boost[i] = Decimal.pow(
                            3,
                            arcane_bought.toString()
                        )

                        game.autods_budget = new Decimal(0)
                    }
                }
            }
            break
        case "dark":
            while (
                game.dark_gamespeed_price.cmp(fib(41, true)) === -1 &&
                game.galactic_shards.cmp(game.dark_gamespeed_price) >= 0
            ) {
                upgrade_dark_gamespeed()
            }
            if (
                game.dark_gamespeed_price.cmp(fib(41, true)) >= 0 &&
                game.dark_gamespeed_level < 100
            ) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.galactic_shards
                                .mul(1 - phi ** 13)
                                .div(game.dark_gamespeed_price)
                        )
                        .log(10) / Math.log10(phi ** 13)
                )
                if (game.dark_gamespeed_level + n > 100)
                    n = 100 - game.dark_gamespeed_level
                if (n > 0) {
                    let price = game.dark_gamespeed_price
                        .mul(1 - phi ** (13 * n))
                        .div(1 - phi ** 13)
                        .round()
                    game.galactic_shards = Decimal.max(
                        game.galactic_shards.sub(price),
                        0
                    )
                    game.dark_gamespeed_price = fib(
                        13 * (game.dark_gamespeed_level + n) - 38,
                        true
                    )
                    game.dark_gamespeed_level += n
                }
            }

            while (
                game.dark_strengthener_price.cmp(fib(41, true)) === -1 &&
                game.galactic_shards.cmp(game.dark_strengthener_price) >= 0
            ) {
                buy_strengthener("dark")
            }
            if (game.dark_strengthener_price.cmp(fib(41, true)) >= 0) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.galactic_shards
                                .mul(1 - phi ** 19)
                                .div(game.dark_strengthener_price)
                        )
                        .log(10) / Math.log10(phi ** 19)
                )
                if (n > 0) {
                    let price = game.dark_strengthener_price
                        .mul(1 - phi ** (19 * n))
                        .div(1 - phi ** 19)
                        .round()
                    game.galactic_shards = Decimal.max(
                        game.galactic_shards.sub(price),
                        0
                    )
                    game.dark_strengthener_price = fib(
                        19 * (game.dark_strengthener + n) - 84,
                        true
                    )
                    game.dark_strengthener += n
                }
            }

            generators = 1
            const price_base = [2, 5, 9, 48, 105, 190]
            const price_scaling = [2, 3, 4, 6, 7, 8]
            for (let i = 1; i < 6; i++) {
                if (game.galactic_shards.cmp(game.dark_spice_price[i]) >= 0)
                    generators++
            }
            budget = game.galactic_shards.div(generators).floor()
            for (let i = 5; i >= 0; i--) {
                let galactic_budget = budget
                if (
                    game.dark_spice_bought[i] === 0n &&
                    galactic_budget.cmp(game.dark_spice_price[i]) >= 0
                ) {
                    game.galactic_shards = Decimal.max(
                        game.galactic_shards.sub(game.dark_spice_price[i]),
                        0
                    )
                    galactic_budget = Decimal.max(
                        galactic_budget.sub(game.dark_spice_price[i]),
                        0
                    )
                    game.dark_spice_gen[i] = game.dark_spice_gen[i].add(1)
                    game.dark_spice_bought[i] += 1n
                    game.dark_spice_price[i] = fib(
                        price_base[i] +
                            price_scaling[i] *
                                game.dark_spice_bought[i].toString(),
                        true
                    )
                }
                while (
                    game.dark_spice_price[i].cmp(fib(41, true)) === -1 &&
                    galactic_budget.cmp(game.dark_spice_price[i]) >= 0
                ) {
                    buy_gen("dark", i)
                }
                if (game.dark_spice_price[i].cmp(fib(41, true)) >= 0) {
                    let m = BigInt(
                        Math.floor(
                            new Decimal(1)
                                .sub(
                                    galactic_budget
                                        .mul(1 - phi ** price_scaling[i])
                                        .div(game.dark_spice_price[i])
                                )
                                .log(10) / Math.log10(phi ** price_scaling[i])
                        )
                    )
                    if (m > 0n) {
                        let price = game.dark_spice_price[i]
                            .mul(
                                new Decimal(1).sub(
                                    Decimal.pow(
                                        phi ** price_scaling[i],
                                        m.toString()
                                    )
                                )
                            )
                            .div(1 - phi ** price_scaling[i])
                        game.galactic_shards = Decimal.max(
                            game.galactic_shards.sub(price),
                            0
                        )
                        game.dark_spice_gen[i] = game.dark_spice_gen[i].add(
                            m.toString()
                        )
                        game.dark_spice_bought[i] += m
                        game.dark_spice_price[i] = fib(
                            price_base[i] +
                                price_scaling[i] *
                                    game.dark_spice_bought[i].toString(),
                            true
                        )
                    }
                }

                game.dark_spice_boost[i] = Decimal.max(
                    Decimal.pow(phi, game.dark_spice_bought[i].toString()).div(
                        phi
                    ),
                    1
                )
            }
            for (let i = 5; i >= 0; i--) {
                if (
                    game.dark_spice_bought[i] === 0n &&
                    game.galactic_shards.cmp(game.dark_spice_price[i]) >= 0
                ) {
                    game.galactic_shards = Decimal.max(
                        game.galactic_shards.sub(game.dark_spice_price[i]),
                        0
                    )
                    game.dark_spice_gen[i] = game.dark_spice_gen[i].add(1)
                    game.dark_spice_bought[i] += 1n
                    game.dark_spice_price[i] = fib(
                        price_base[i] +
                            price_scaling[i] *
                                game.dark_spice_bought[i].toString(),
                        true
                    )
                }
                while (
                    game.dark_spice_price[i].cmp(fib(41, true)) === -1 &&
                    game.galactic_shards.cmp(game.dark_spice_price[i]) >= 0
                ) {
                    buy_gen("dark", i)
                }
                if (game.dark_spice_price[i].cmp(fib(41, true)) >= 0) {
                    let m = BigInt(
                        Math.floor(
                            new Decimal(1)
                                .sub(
                                    game.galactic_shards
                                        .mul(1 - phi ** price_scaling[i])
                                        .div(game.dark_spice_price[i])
                                )
                                .log(10) / Math.log10(phi ** price_scaling[i])
                        )
                    )
                    if (m > 0n) {
                        let price = game.dark_spice_price[i]
                            .mul(
                                new Decimal(1).sub(
                                    Decimal.pow(
                                        phi ** price_scaling[i],
                                        m.toString()
                                    )
                                )
                            )
                            .div(1 - phi ** price_scaling[i])
                            .round()
                        game.galactic_shards = Decimal.max(
                            game.galactic_shards.sub(price),
                            0
                        )
                        game.dark_spice_gen[i] = game.dark_spice_gen[i].add(
                            m.toString()
                        )
                        game.dark_spice_bought[i] += m
                        game.dark_spice_price[i] = fib(
                            price_base[i] +
                                price_scaling[i] *
                                    game.dark_spice_bought[i].toString(),
                            true
                        )
                    }
                }

                game.dark_spice_boost[i] = Decimal.max(
                    Decimal.pow(phi, game.dark_spice_bought[i].toString()).div(
                        phi
                    ),
                    1
                )
            }
            break
    }
}

//toggle automation for spice
function auto_toggle(color, unless) {
    switch (color) {
        case "red":
            if (game.autosp_toggle[0]) {
                game.autosp_toggle[0] = false
                document.getElementById("red_auto").innerHTML = "Auto: OFF"
                document.getElementById("red_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autosp_toggle[0] = true
                document.getElementById("red_auto").innerHTML = "Auto: ON"
                document.getElementById("red_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "yellow":
            if (game.autosp_toggle[1]) {
                game.autosp_toggle[1] = false
                document.getElementById("yellow_auto").innerHTML = "Auto: OFF"
                document.getElementById("yellow_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autosp_toggle[1] = true
                document.getElementById("yellow_auto").innerHTML = "Auto: ON"
                document.getElementById("yellow_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "green":
            if (game.autosp_toggle[2]) {
                game.autosp_toggle[2] = false
                document.getElementById("green_auto").innerHTML = "Auto: OFF"
                document.getElementById("green_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autosp_toggle[2] = true
                document.getElementById("green_auto").innerHTML = "Auto: ON"
                document.getElementById("green_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "blue":
            if (game.autosp_toggle[3]) {
                game.autosp_toggle[3] = false
                document.getElementById("blue_auto").innerHTML = "Auto: OFF"
                document.getElementById("blue_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autosp_toggle[3] = true
                document.getElementById("blue_auto").innerHTML = "Auto: ON"
                document.getElementById("blue_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "pink":
            if (game.autosp_toggle[4]) {
                game.autosp_toggle[4] = false
                document.getElementById("pink_auto").innerHTML = "Auto: OFF"
                document.getElementById("pink_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autosp_toggle[4] = true
                document.getElementById("pink_auto").innerHTML = "Auto: ON"
                document.getElementById("pink_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "boost":
            if (game.autocb_toggle) {
                game.autocb_toggle = false
                document.getElementById("boost_auto").innerHTML = "Auto: OFF"
                document.getElementById("boost_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autocb_toggle = true
                document.getElementById("boost_auto").innerHTML = "Auto: ON"
                document.getElementById("boost_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "infusion":
            if (game.autoin_toggle) {
                game.autoin_toggle = false
                document.getElementById("infusion_auto").innerHTML = "Auto: OFF"
                document.getElementById("infusion_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autoin_toggle = true
                document.getElementById("infusion_auto").innerHTML = "Auto: ON"
                document.getElementById("infusion_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "prestige":
            if (game.autopr_toggle) {
                game.autopr_toggle = false
                document.getElementById("prestige_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("prestige_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autopr_toggle = true
                document.getElementById("prestige_auto_toggle").innerHTML =
                    "Auto: ON"
                document.getElementById("prestige_auto_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "prestige_mode":
            if (game.autopr_mode === 0) {
                game.autopr_mode = 1
                document.getElementById("prestige_auto_mode").innerHTML =
                    "Mode: " + spice_text[2]
            } else if (game.autopr_mode === 1) {
                game.autopr_mode = 2
                document.getElementById("prestige_auto_mode").innerHTML =
                    "Mode: TIME"
            } else if (game.autopr_mode === 2) {
                game.autopr_mode = 0
                document.getElementById("prestige_auto_mode").innerHTML =
                    "Mode: BOOSTS"
            }
            break
        case "prestige_upgrade":
            if (game.autoup_toggle[0]) {
                game.autoup_toggle[0] = false
                document.getElementById("upgrade_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("upgrade_auto_toggle2").innerHTML =
                    "Auto: OFF"
                document.getElementById("upgrade_auto_toggle").className =
                    "spice_buy a_disabled"
                document.getElementById("upgrade_auto_toggle2").className =
                    "spice_buy a_disabled"
            } else {
                game.autoup_toggle[0] = true
                document.getElementById("upgrade_auto_toggle").innerHTML =
                    "Auto: ON"
                document.getElementById("upgrade_auto_toggle2").innerHTML =
                    "Auto: ON"
                document.getElementById("upgrade_auto_toggle").className =
                    "spice_buy a_enabled"
                document.getElementById("upgrade_auto_toggle2").className =
                    "spice_buy a_enabled"
            }
            break
        case "crystal":
            if (game.autocr_toggle) {
                game.autocr_toggle = false
                document.getElementById("crystal_auto").innerHTML = "Auto: OFF"
                document.getElementById("crystal_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autocr_toggle = true
                document.getElementById("crystal_auto").innerHTML = "Auto: ON"
                document.getElementById("crystal_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "ascend":
            if (game.autoas_toggle) {
                game.autoas_toggle = false
                document.getElementById("ascend_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("ascend_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                if (!game.ascend_confirm || unless) {
                    game.autoas_toggle = true
                    document.getElementById("ascend_auto_toggle").innerHTML =
                        "Auto: ON"
                    document.getElementById("ascend_auto_toggle").className =
                        "spice_buy a_enabled"
                } else {
                    if (modal === "none") {
                        open_modal(
                            "alert",
                            "Ascension confirmations must be off to turn on Ascension automation!"
                        )
                    }
                }
            }
            break
        case "enchantment":
            if (game.autoen_toggle) {
                game.autoen_toggle = false
                document.getElementById("enchantment_auto").innerHTML =
                    "Auto: OFF"
                document.getElementById("enchantment_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autoen_toggle = true
                document.getElementById("enchantment_auto").innerHTML =
                    "Auto: ON"
                document.getElementById("enchantment_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "ascend_mode":
            if (game.autoas_mode === 0) {
                game.autoas_mode = 1
                document.getElementById("ascend_auto_mode").innerHTML =
                    "Mode: TIME"
            } else if (game.autoas_mode === 1) {
                game.autoas_mode = 0
                document.getElementById("ascend_auto_mode").innerHTML =
                    "Mode: RUNES"
            }
            break
        case "ascend_upgrade":
            if (game.autoup_toggle[1]) {
                game.autoup_toggle[1] = false
                document.getElementById("upgrade_auto_toggle3").innerHTML =
                    "Auto: OFF"
                document.getElementById("upgrade_auto_toggle3").className =
                    "spice_buy a_disabled"
            } else {
                game.autoup_toggle[1] = true
                document.getElementById("upgrade_auto_toggle3").innerHTML =
                    "Auto: ON"
                document.getElementById("upgrade_auto_toggle3").className =
                    "spice_buy a_enabled"
            }
            break
        case "distributor":
            if (game.autods_toggle) {
                game.autods_toggle = false
                document.getElementById("distribute_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("distribute_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autods_toggle = true
                document.getElementById("distribute_auto_toggle").innerHTML =
                    "Auto: ON"
                document.getElementById("distribute_auto_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "arcane":
            if (game.autoar_toggle) {
                game.autoar_toggle = false
                document.getElementById("arcane_auto").innerHTML = "Auto: OFF"
                document.getElementById("arcane_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autoar_toggle = true
                document.getElementById("arcane_auto").innerHTML = "Auto: ON"
                document.getElementById("arcane_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "ascend_c11":
            if (game.autoas_c11) {
                game.autoas_c11 = false
                document.getElementById("ascend_auto_c11").innerHTML =
                    "DISABLED"
            } else {
                game.autoas_c11 = true
                document.getElementById("ascend_auto_c11").innerHTML = "ENABLED"
            }
            break
        case "collapse":
            if (game.autoco_toggle) {
                game.autoco_toggle = false
                document.getElementById("collapse_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("collapse_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                if (!game.collapse_confirm || unless) {
                    game.autoco_toggle = true
                    document.getElementById("collapse_auto_toggle").innerHTML =
                        "Auto: ON"
                    document.getElementById("collapse_auto_toggle").className =
                        "spice_buy a_enabled"
                } else {
                    if (modal === "none") {
                        open_modal(
                            "alert",
                            "Collapse confirmations must be off to turn on Collapse automation!"
                        )
                    }
                }
            }
            break
        case "collapse_mode":
            if (game.autoco_mode === 0) {
                game.autoco_mode = 1
                document.getElementById("collapse_auto_mode").innerHTML =
                    "Mode: TIME"
            } else if (game.autoco_mode === 1) {
                game.autoco_mode = 2
                document.getElementById("collapse_auto_mode").innerHTML =
                    "Mode: DECAY"
            } else if (game.autoco_mode === 2) {
                game.autoco_mode = 0
                document.getElementById("collapse_auto_mode").innerHTML =
                    "Mode: " + spice_text[2]
            }
            break
        case "collider":
            if (game.autosc_toggle) {
                game.autosc_toggle = false
                document.getElementById("collider_auto").innerHTML = "Auto: OFF"
                document.getElementById("collider_auto").className =
                    "atomic_button co_unlocked"
            } else {
                game.autosc_toggle = true
                document.getElementById("collider_auto").innerHTML = "Auto: ON"
                document.getElementById("collider_auto").className =
                    "atomic_button co_active"
            }
            break
        case "research":
            if (game.autors_toggle) {
                game.autors_toggle = false
                document.getElementById("research_auto_toggle").innerHTML =
                    "DISABLED"
                document.getElementById("research_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autors_toggle = true
                document.getElementById("research_auto_toggle").innerHTML =
                    "ENABLED"
                document.getElementById("research_auto_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "research_view":
            if (game.autors_view) {
                game.autors_view = false
                document.getElementById("research_view_toggle").innerHTML =
                    "DISABLED"
                document.getElementById("research_view_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autors_view = true
                document.getElementById("research_view_toggle").innerHTML =
                    "ENABLED"
                document.getElementById("research_view_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "research_upgrade":
            if (game.autors_upgrade) {
                game.autors_upgrade = false
                document.getElementById("research_upgrade_auto").innerHTML =
                    "Auto: OFF"
                document.getElementById("research_upgrade_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autors_upgrade = true
                document.getElementById("research_upgrade_auto").innerHTML =
                    "Auto: ON"
                document.getElementById("research_upgrade_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "collapse_challenge":
            if (game.autocc_toggle) {
                game.autocc_toggle = false
                document.getElementById("challenge_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("challenge_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autocc_toggle = true
                document.getElementById("challenge_auto_toggle").innerHTML =
                    "Auto: ON"
                document.getElementById("challenge_auto_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "antispice":
            if (game.autoap_toggle) {
                game.autoap_toggle = false
                document.getElementById("antispice_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("antispice_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                game.autoap_toggle = true
                document.getElementById("antispice_auto_toggle").innerHTML =
                    "Auto: ON"
                document.getElementById("antispice_auto_toggle").className =
                    "spice_buy a_enabled"
            }
            break
        case "construct":
            if (game.autocs_toggle) {
                game.autocs_toggle = false
                document.getElementById("construct_auto").innerHTML =
                    "Auto: OFF"
                document.getElementById("construct_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autocs_toggle = true
                document.getElementById("construct_auto").innerHTML = "Auto: ON"
                document.getElementById("construct_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "conversion":
            if (game.autocv_toggle) {
                game.autocv_toggle = false
                document.getElementById("conversion_auto").innerHTML =
                    "Auto: OFF"
                document.getElementById("conversion_auto").className =
                    "spice_buy a_disabled"
            } else {
                game.autocv_toggle = true
                document.getElementById("conversion_auto").innerHTML =
                    "Auto: ON"
                document.getElementById("conversion_auto").className =
                    "spice_buy a_enabled"
            }
            break
        case "revisit":
            if (game.autore_toggle) {
                game.autore_toggle = false
                document.getElementById("revisit_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("revisit_auto_toggle").className =
                    "spice_buy a_disabled"
            } else {
                if (!game.expand_confirm || unless) {
                    game.autore_toggle = true
                    document.getElementById("revisit_auto_toggle").innerHTML =
                        "Auto: ON"
                    document.getElementById("revisit_auto_toggle").className =
                        "spice_buy a_enabled"
                } else {
                    if (modal === "none") {
                        open_modal(
                            "alert",
                            "Expansion confirmations must be off to turn on realm revisiting automation!"
                        )
                    }
                }
            }
            break
        case "revisit_mode":
            if (game.autore_mode === 0) {
                game.autore_mode = 1
                document.getElementById("revisit_auto_mode").innerHTML =
                    "Mode: TIME"
            } else if (game.autore_mode === 1) {
                game.autore_mode = 0
                document.getElementById("revisit_auto_mode").innerHTML =
                    "Mode: SHARDS"
            }
            break
    }
}

//buying prestige upgrades
function buy_prestige_upgrade(id, max) {
    if (max) {
        if (id === 20) {
            if (game.ascend_bought[5]) {
                if (
                    game.rainbow_spice.cmp(
                        prestige_upgrade.upgrades[id].price
                    ) >= 0
                ) {
                    if (
                        game.prestige_bought[id] <
                        prestige_upgrade.upgrades[id].max
                    ) {
                        while (
                            game.rainbow_spice.cmp(
                                prestige_upgrade.upgrades[id].price
                            ) >= 0 &&
                            game.prestige_bought[id] <
                                prestige_upgrade.upgrades[id].max
                        ) {
                            game.rainbow_spice = Decimal.max(
                                game.rainbow_spice.sub(
                                    prestige_upgrade.upgrades[id].price
                                ),
                                0
                            )
                            game.prestige_bought[id]++

                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(
                                    Decimal.pow(
                                        2,
                                        8 + game.prestige_bought[id] * 8
                                    )
                                )
                        }
                    }
                    if (
                        game.prestige_bought[id] >=
                            prestige_upgrade.upgrades[id].max &&
                        game.rainbow_spice.cmp(
                            prestige_upgrade.upgrades[id].price
                        ) >= 0
                    ) {
                        let n = Math.floor(
                            5.5 +
                                (game.rainbow_spice.ln() - 492 * Math.log(2)) **
                                    0.5 /
                                    (2 * (2 * Math.log(2)) ** 0.5)
                        )
                        let price = Decimal.pow(2, 8 * n ** 2 - 88 * n + 734)

                        if (n > game.prestige_bought[id]) {
                            game.rainbow_spice = Decimal.max(
                                game.rainbow_spice.sub(price),
                                0
                            )
                            game.prestige_bought[id] = n

                            prestige_upgrade.upgrades[id].price = price.mul(
                                Decimal.pow(
                                    2,
                                    16 * game.prestige_bought[id] - 80
                                )
                            )
                        }
                    }
                }
            } else {
                while (
                    game.rainbow_spice.cmp(
                        prestige_upgrade.upgrades[id].price
                    ) >= 0 &&
                    game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
                ) {
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(
                            prestige_upgrade.upgrades[id].price
                        ),
                        0
                    )
                    game.prestige_bought[id]++

                    if (
                        game.prestige_bought[id] <
                        prestige_upgrade.upgrades[id].max
                    )
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(2, 8 + game.prestige_bought[id] * 8)
                            )
                }
            }
        } else {
            while (
                game.rainbow_spice.cmp(prestige_upgrade.upgrades[id].price) >=
                    0 &&
                game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
            ) {
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(prestige_upgrade.upgrades[id].price),
                    0
                )
                game.prestige_bought[id]++

                if (
                    game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
                )
                    switch (id) {
                        case 0:
                            switch (game.prestige_bought[id]) {
                                case 1:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(4)
                                    break
                                case 2:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(16)
                                    break
                                case 3:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(256)
                                    break
                                case 4:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(65536)
                                    break
                                default:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(1)
                                    break
                            }
                            break
                        case 2:
                            if (game.prestige_bought[id] > 9) {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(
                                        Decimal.pow(
                                            2,
                                            game.prestige_bought[id] - 6
                                        )
                                    )
                            } else if (game.prestige_bought[id] > 5) {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(8)
                            } else {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(4)
                            }
                            break
                        case 3:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(256)
                            break
                        case 4:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(8)
                            break
                        case 5:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(
                                    2 ** (game.prestige_bought[id] + 3)
                                )
                            break
                        case 9:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(1024)
                            break
                    }
            }
        }
    } else {
        if (id === 20) {
            if (game.ascend_bought[5]) {
                if (
                    game.rainbow_spice.cmp(
                        prestige_upgrade.upgrades[id].price
                    ) >= 0
                ) {
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(
                            prestige_upgrade.upgrades[id].price
                        ),
                        0
                    )
                    game.prestige_bought[id]++

                    if (
                        game.prestige_bought[id] <
                        prestige_upgrade.upgrades[id].max
                    )
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(2, 8 + game.prestige_bought[id] * 8)
                            )
                    else
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(
                                    2,
                                    16 * game.prestige_bought[id] - 80
                                )
                            )
                }
            } else {
                if (
                    game.rainbow_spice.cmp(
                        prestige_upgrade.upgrades[id].price
                    ) >= 0 &&
                    game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
                ) {
                    game.rainbow_spice = Decimal.max(
                        game.rainbow_spice.sub(
                            prestige_upgrade.upgrades[id].price
                        ),
                        0
                    )
                    game.prestige_bought[id]++

                    if (
                        game.prestige_bought[id] <
                        prestige_upgrade.upgrades[id].max
                    )
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(2, 8 + game.prestige_bought[id] * 8)
                            )
                }
            }
        } else {
            if (
                game.rainbow_spice.cmp(prestige_upgrade.upgrades[id].price) >=
                    0 &&
                game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
            ) {
                game.rainbow_spice = Decimal.max(
                    game.rainbow_spice.sub(prestige_upgrade.upgrades[id].price),
                    0
                )
                game.prestige_bought[id]++

                if (
                    game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
                )
                    switch (id) {
                        case 0:
                            switch (game.prestige_bought[id]) {
                                case 1:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(4)
                                    break
                                case 2:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(16)
                                    break
                                case 3:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(256)
                                    break
                                case 4:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(65536)
                                    break
                                default:
                                    prestige_upgrade.upgrades[id].price =
                                        new Decimal(1)
                                    break
                            }
                            break
                        case 2:
                            if (game.prestige_bought[id] > 9) {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(
                                        Decimal.pow(
                                            2,
                                            game.prestige_bought[id] - 6
                                        )
                                    )
                            } else if (game.prestige_bought[id] > 5) {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(8)
                            } else {
                                prestige_upgrade.upgrades[id].price =
                                    prestige_upgrade.upgrades[id].price.mul(4)
                            }
                            break
                        case 3:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(256)
                            break
                        case 4:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(8)
                            break
                        case 5:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(
                                    2 ** (game.prestige_bought[id] + 3)
                                )
                            break
                        case 9:
                            prestige_upgrade.upgrades[id].price =
                                prestige_upgrade.upgrades[id].price.mul(1024)
                            break
                        case 12:
                            if (!entry_unlocked[5]) entry_unlock(5)
                            break
                    }
            }
        }
    }
}

//buying crystal infusions
function buy_infusion() {
    if (
        game.crystal_spice.cmp(game.crystal_infusion_price) >= 0 &&
        game.ascend_challenge !== 1 &&
        game.collapse_challenge !== 7
    ) {
        game.crystal_spice = Decimal.max(
            game.crystal_spice.sub(game.crystal_infusion_price),
            0
        )
        if (game.crystal_infusion <= 3n)
            game.crystal_infusion_price = game.crystal_infusion_price.mul(
                2 ** 0.5
            )
        else if (game.crystal_infusion <= 7n)
            game.crystal_infusion_price = game.crystal_infusion_price.mul(2)
        else game.crystal_infusion_price = game.crystal_infusion_price.mul(4)
        if (game.crystal_infusion >= 25n) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(6)
        }
        if (game.crystal_infusion >= 55n) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(8)
        }
        if (game.crystal_infusion >= 165n) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(10)
        }
        if (game.crystal_infusion >= 23500n) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(1.2e9)
        }
        game.crystal_infusion += 1n

        if (game.crystal_spice.cmp(0) < 0) game.crystal_spice = new Decimal(0)
    }
}

//maxing crystal infusions
function max_infusion() {
    let n = 0n
    if (
        game.crystal_spice.cmp(game.crystal_infusion_price) >= 0 &&
        game.ascend_challenge !== 1 &&
        game.collapse_challenge !== 7
    ) {
        if (game.crystal_infusion < 4n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(1 - 2 ** 0.5)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(2 ** 0.5)
                )
            )
            if (game.crystal_infusion + n >= 4n) n = 4n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(
                        new Decimal(1).sub(
                            new Decimal(2 ** 0.5).pow(n.toString())
                        )
                    )
                    .div(1 - 2 ** 0.5)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(2 ** 0.5).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 8n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(-1)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(2)
                )
            )
            if (game.crystal_infusion + n >= 8n) n = 8n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(2).pow(n.toString())))
                    .div(-1)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(2).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 25n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(-3)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(4)
                )
            )
            if (game.crystal_infusion + n >= 25n)
                n = 25n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(4).pow(n.toString())))
                    .div(-3)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(4).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 55n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(-23)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(24)
                )
            )
            if (game.crystal_infusion + n >= 55n)
                n = 55n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(24).pow(n.toString())))
                    .div(-23)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(24).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 165n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(-191)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(192)
                )
            )
            if (game.crystal_infusion + n >= 165n)
                n = 165n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(192).pow(n.toString())))
                    .div(-191)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(192).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 23500n) {
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.crystal_spice
                                .mul(-1919)
                                .div(game.crystal_infusion_price)
                        )
                        .log(10) / Math.log10(1920)
                )
            )
            if (game.crystal_infusion + n >= 23500n)
                n = 23500n - game.crystal_infusion
            if (n > 0n) {
                let price = game.crystal_infusion_price
                    .mul(
                        new Decimal(1).sub(new Decimal(1920).pow(n.toString()))
                    )
                    .div(-1919)
                game.crystal_spice = Decimal.max(
                    game.crystal_spice.sub(price),
                    0
                )
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(1920).pow(n.toString())
                )
                game.crystal_infusion += n
            }
        }
        n = BigInt(
            Math.floor(
                new Decimal(1)
                    .sub(
                        game.crystal_spice
                            .mul(-2.304e12 + 1)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(2.304e12)
            )
        )
        if (n > 0n) {
            let price = game.crystal_infusion_price
                .mul(
                    new Decimal(1).sub(new Decimal(2.304e12).pow(n.toString()))
                )
                .div(-2.304e12 + 1)
            game.crystal_spice = Decimal.max(game.crystal_spice.sub(price), 0)
            game.crystal_infusion_price = game.crystal_infusion_price.mul(
                new Decimal(2.304e12).pow(n.toString())
            )
            game.crystal_infusion += n
        }

        if (game.crystal_spice.cmp(0) < 0) game.crystal_spice = new Decimal(0)
    }
}

//reset dynamic auto-prestige goal
function prestige_goal_reset() {
    if (game.autopr_mode === 0) game.autopr_goal2[0] = 0
    if (game.autopr_mode === 1) game.autopr_goal2[1] = new Decimal(1)
}

//convert runes
function convert_rune(id, max, half) {
    if (game.ansuz.cmp(1) >= 0) {
        if (max) {
            if (half) {
                game.rune[id] = game.rune[id].add(game.ansuz.div(2).floor())
                game.ansuz = Decimal.max(
                    game.ansuz.sub(game.ansuz.div(2).floor()),
                    0
                )

                game.autods_budget = new Decimal(0)
            } else {
                game.rune[id] = game.rune[id].add(game.ansuz)
                game.ansuz = new Decimal(0)

                game.autods_budget = new Decimal(0)
            }
        } else {
            game.rune[id] = game.rune[id].add(1)
            game.ansuz = Decimal.max(game.ansuz.sub(1), 0)

            game.autods_budget = new Decimal(0)
        }
    }
}

//distribute runes
function distribute_runes(mode) {
    let amount = new Decimal(0)
    if (mode === "all") {
        if (game.ansuz.cmp(3) >= 0) {
            amount = game.ansuz.div(3).floor()
            game.autods_budget = new Decimal(0)
        }
    }
    if (mode === "half") {
        if (game.ansuz.cmp(6) >= 0) {
            amount = game.ansuz.div(6).floor()
            game.autods_budget = new Decimal(0)
        }
    }
    if (mode === "budget") {
        if (game.autods_budget.cmp(3) >= 0) {
            amount = game.autods_budget.div(3).floor()
            game.autods_budget = new Decimal(0)
        }
    }

    game.ansuz = Decimal.max(game.ansuz.sub(amount.mul(3)), 0)
    for (let i = 0; i < 3; i++) {
        game.rune[i] = game.rune[i].add(amount)
    }
}

//buying ascension upgrades
function buy_ascension_upgrade(id) {
    let condition1 = false
    let condition2 = false
    let upgrade1 = ascension_upgrade.upgrades[id].req
    let upgrade2 = ascension_upgrade.upgrades[id].req2
    if (upgrade1 !== undefined) {
        if (game.ascend_bought[upgrade1]) {
            if (ascension_upgrade.upgrades[upgrade1].challenge !== 0) {
                if (
                    game.ascend_complete[
                        ascension_upgrade.upgrades[upgrade1].challenge - 1
                    ]
                )
                    condition1 = true
                else condition1 = false
            } else {
                condition1 = true
            }
        } else condition1 = false
    } else {
        condition1 = true
    }
    if (upgrade2 !== undefined) {
        if (game.ascend_bought[upgrade2]) {
            if (ascension_upgrade.upgrades[upgrade2].challenge !== 0) {
                if (
                    game.ascend_complete[
                        ascension_upgrade.upgrades[upgrade2].challenge - 1
                    ]
                )
                    condition2 = true
                else condition2 = false
            } else {
                condition2 = true
            }
        } else condition2 = false
    } else {
        condition2 = true
    }

    if (
        !game.ascend_bought[id] &&
        condition1 &&
        condition2 &&
        (game.rune[2].cmp(1) >= 0 || game.collapse >= 1 || game.expand >= 1)
    ) {
        if (game.collapse_challenge === 10) {
            if (
                game.ansuz.cmp(
                    ascension_upgrade.upgrades[id].price.pow(0.5).ceil()
                ) >= 0
            ) {
                game.ansuz = Decimal.max(
                    game.ansuz.sub(
                        ascension_upgrade.upgrades[id].price.pow(0.5).ceil()
                    ),
                    0
                )
                game.ascend_bought[id] = true

                game.autods_budget = new Decimal(0)
            }
        } else {
            if (game.ansuz.cmp(ascension_upgrade.upgrades[id].price) >= 0) {
                game.ansuz = Decimal.max(
                    game.ansuz.sub(ascension_upgrade.upgrades[id].price),
                    0
                )
                game.ascend_bought[id] = true

                if (id === 16) {
                    if (game.collapse === 0 && game.expand === 0) {
                        confirmations("challenge")
                        confirmations("challenge")
                    }
                }

                game.autods_budget = new Decimal(0)
            }
        }

        if (game.research_complete[9] >= 1) {
            for (let i = 0; i < 6; i++) {
                if (
                    game.ascend_bought[ascension_challenge.challenges[i].unlock]
                ) {
                    game.ascend_complete[i] = true
                }
            }
        }
    }
}

//entering an ascension challenge
function pre_enter_ascension_challenge(id) {
    if (game.ascend_challenge === 0 && !game.ascend_complete[id - 1]) {
        if (game.challenge_confirm) {
            if (modal === "none") {
                open_modal(
                    "confirm",
                    "Are you sure you want to enter Challenge " +
                        format_num(id, 0) +
                        "? You will Ascend!",
                    function () {
                        enter_ascension_challenge(id)
                    }
                )
            }
        } else {
            enter_ascension_challenge(id)
        }
    } else {
        if (game.ascend_challenge === id) {
            pre_ascend()
        } else {
            if (modal === "none") {
                open_modal(
                    "alert",
                    "You cannot enter an Ascension Challenge if you are already in one!"
                )
            }
        }
    }
}

function enter_ascension_challenge(id) {
    ascend(true)
    game.ascend_challenge = id

    if (game.ascend_challenge === 5) game.ascend_challenge_timer = 0
}

//exiting an ascension challenge
function exit_ascension_challenge() {
    if (game.ascend_challenge !== 0) {
        let challenge = game.ascend_challenge
        game.ascend_challenge = 0
        pre_ascend(true, challenge)
    }
}

//buying arcane enchantments
function buy_enchantment() {
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        game.arcane_spice = Decimal.max(
            game.arcane_spice.sub(game.arcane_enchantment_price),
            0
        )
        game.arcane_enchantment_price = game.arcane_enchantment_price.mul(2)
        if (game.arcane_enchantment >= 4)
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(2)
        if (
            game.arcane_enchantment >= 24 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(5)
        if (
            game.arcane_enchantment >= 108 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(6)
        if (
            game.arcane_enchantment >= 3750 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price =
                game.arcane_enchantment_price.mul(4.8)
        if (
            game.arcane_enchantment >= 10000 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price =
                game.arcane_enchantment_price.mul(6300)

        game.arcane_enchantment += 1n
        game.ascend_challenge_timer = 0

        if (game.research_complete[13] >= 1 && game.collapse_challenge !== 12) {
            game.free_enchantment = game.arcane_enchantment / 10n
            if (
                game.research_complete[15] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment += BigInt(game.arcane_strengthener) * 10n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 100n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            5000000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                7500000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 10n + 19125000n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment += collapse_free
            }
        }

        if (game.arcane_spice.cmp(0) < 0) game.arcane_spice = new Decimal(0)
    }
}

//maxing arcane enchantments
function max_enchantment() {
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        let n = 0n
        if (game.ascend_challenge === 5 || game.collapse_challenge === 7) {
            if (game.arcane_enchantment < 4n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-1)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(2)
                    )
                )
                if (game.arcane_enchantment + n >= 4n)
                    n = 4n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(new Decimal(2).pow(n.toString()))
                        )
                        .div(-1)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(2).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-3)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(4)
                )
            )
            if (n > 0n) {
                let price = game.arcane_enchantment_price
                    .mul(new Decimal(1).sub(new Decimal(4).pow(n.toString())))
                    .div(-3)
                game.arcane_spice = Decimal.max(game.arcane_spice.sub(price), 0)
                game.arcane_enchantment_price =
                    game.arcane_enchantment_price.mul(
                        new Decimal(4).pow(n.toString())
                    )
                game.arcane_enchantment += n
                game.ascend_challenge_timer = 0
            }
        } else {
            if (game.arcane_enchantment < 4n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-1)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(2)
                    )
                )
                if (game.arcane_enchantment + n >= 4n)
                    n = 4n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(new Decimal(2).pow(n.toString()))
                        )
                        .div(-1)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(2).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 24n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-3)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(4)
                    )
                )
                if (game.arcane_enchantment + n >= 24n)
                    n = 24n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(new Decimal(4).pow(n.toString()))
                        )
                        .div(-3)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(4).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 108n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-19)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(20)
                    )
                )
                if (game.arcane_enchantment + n >= 108n)
                    n = 108n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(20).pow(n.toString())
                            )
                        )
                        .div(-19)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(20).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 3750n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-119)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(120)
                    )
                )
                if (game.arcane_enchantment + n >= 3750n)
                    n = 3750n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(120).pow(n.toString())
                            )
                        )
                        .div(-119)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(120).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 10000n) {
                n = BigInt(
                    Math.floor(
                        new Decimal(1)
                            .sub(
                                game.arcane_spice
                                    .mul(-575)
                                    .div(game.arcane_enchantment_price)
                            )
                            .log(10) / Math.log10(576)
                    )
                )
                if (game.arcane_enchantment + n >= 10000n)
                    n = 10000n - game.arcane_enchantment
                if (n > 0n) {
                    let price = game.arcane_enchantment_price
                        .mul(
                            new Decimal(1).sub(
                                new Decimal(576).pow(n.toString())
                            )
                        )
                        .div(-575)
                    game.arcane_spice = Decimal.max(
                        game.arcane_spice.sub(price),
                        0
                    )
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(576).pow(n.toString())
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-3628799)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(3628800)
                )
            )
            if (n > 0n) {
                let price = game.arcane_enchantment_price
                    .mul(
                        new Decimal(1).sub(
                            new Decimal(3628800).pow(n.toString())
                        )
                    )
                    .div(-3628799)
                game.arcane_spice = Decimal.max(game.arcane_spice.sub(price), 0)
                game.arcane_enchantment_price =
                    game.arcane_enchantment_price.mul(
                        new Decimal(3628800).pow(n.toString())
                    )
                game.arcane_enchantment += n
                game.ascend_challenge_timer = 0
            }
        }

        if (game.research_complete[13] >= 1 && game.collapse_challenge !== 12) {
            game.free_enchantment = game.arcane_enchantment / 10n
            if (
                game.research_complete[15] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment += BigInt(game.arcane_strengthener) * 10n
            if (
                game.research_complete[27] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 100n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            5000000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                7500000
                        )
                    )
                if (game.collapse >= 1337500)
                    collapse_free = BigInt(game.collapse) * 10n + 19125000n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment += collapse_free
            }
        }

        if (game.arcane_spice.cmp(0) < 0) game.arcane_spice = new Decimal(0)
    }
}

//reset dynamic auto-ascend goal
function ascend_goal_reset() {
    game.autoas_goal2 = new Decimal(1)
}

//activating the spice collider
function activate_collider() {
    let can_collide = false

    let red_amount = Decimal.pow(
        10,
        (game.antitotal_spice[1].log(10) / 1e11) ** 0.5
    ).div(17)
    if (red_amount.cmp(Decimal.pow(10, 2319)) >= 0)
        red_amount = Decimal.pow(10, (red_amount.log(10) / 2319) ** 0.5 * 2319)
    let yellow_amount = Decimal.pow(
        10,
        (game.antitotal_spice[2].log(10) / 2e11) ** 0.5
    ).div(38.5)
    if (yellow_amount.cmp(Decimal.pow(10, 1019)) >= 0)
        yellow_amount = Decimal.pow(
            10,
            (yellow_amount.log(10) / 1019) ** 0.4 * 1019
        )
    let green_amount = Decimal.pow(
        10,
        (game.antitotal_spice[3].log(10) / 3e11) ** 0.5
    ).div(2340)
    if (green_amount.cmp(Decimal.pow(10, 504)) >= 0)
        green_amount = Decimal.pow(
            10,
            (green_amount.log(10) / 504) ** 0.75 * 504
        )
    let blue_amount = Decimal.pow(
        10,
        (game.antitotal_spice[4].log(10) / 5e11) ** 0.5
    ).div(8.667e9)
    if (blue_amount.cmp(Decimal.pow(10, 216)) >= 0)
        blue_amount = Decimal.pow(10, (blue_amount.log(10) / 216) ** 0.8 * 216)
    let pink_amount = Decimal.pow(
        10,
        (game.antitotal_spice[5].log(10) / 8e11) ** 0.5
    ).div(2.255e9)
    if (pink_amount.cmp(Decimal.pow(10, 70)) >= 0)
        pink_amount = Decimal.pow(10, (pink_amount.log(10) / 70) ** 0.6 * 70)
    let rainbow_amount = (game.antitotal_spice[6].log(10) - 28550000) / 5400000
    if (rainbow_amount > 0.5)
        rainbow_amount = ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
    else rainbow_amount = 0.5
    if (rainbow_amount > 24) {
        if (game.galactic_bought[7])
            rainbow_amount = (rainbow_amount - 24) ** 0.54 + 24
        else rainbow_amount = 24
    }
    let atomic_amount =
        (game.spent_atomic_spice[6]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .log(10) -
            32768) /
        1984
    if (atomic_amount > 0.5)
        atomic_amount = ((atomic_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
    else atomic_amount = 0.5
    if (atomic_amount > 24) {
        if (game.galactic_bought[7])
            atomic_amount = (atomic_amount - 24) ** 0.54 + 24
        else atomic_amount = 24
    }

    let pending_amount = new Decimal(0)

    switch (game.collider_tab) {
        case 0:
            if (
                game.atomic_spice
                    .mul(game.atomic_portion)
                    .pow(game.atomic_efficiency + game.dark_efficiency)
                    .cmp(1) >= 0
            )
                can_collide = true
            break
        case 1:
            pending_amount = game.spent_atomic_spice[0]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 76)
            if (pending_amount.cmp(Decimal.pow(10, 170)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 170))
                    .pow(0.6)
                    .mul(Decimal.pow(10, 170))
            if (pending_amount.cmp(Decimal.pow(10, 515)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 515) ** 0.67 * 515
                )
            if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 1000))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 1000))
            if (pending_amount.sub(game.antispice[0]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 2:
            pending_amount = game.spent_atomic_spice[1]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
                .div(3.2)
                .mul(red_amount)
            if (pending_amount.cmp(Decimal.pow(10, 128)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 128))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 128))
            if (pending_amount.cmp(Decimal.pow(10, 269)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 269))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 269))
            if (pending_amount.cmp(Decimal.pow(10, 450)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 450) ** 0.5 * 450
                )
            if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 1000))
                    .pow(2)
                    .mul(Decimal.pow(10, 1000))
            if (pending_amount.sub(game.antispice[1]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 3:
            pending_amount = game.spent_atomic_spice[2]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
                .div(54)
                .mul(yellow_amount)
            if (pending_amount.cmp(Decimal.pow(10, 87)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 87))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 87))
            if (pending_amount.cmp(Decimal.pow(10, 372)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 372) ** 0.5 * 372
                )
            if (pending_amount.sub(game.antispice[2]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 4:
            pending_amount = game.spent_atomic_spice[3]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
                .div(108000)
                .mul(green_amount)
            if (pending_amount.cmp(Decimal.pow(10, 56)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 56))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 56))
            if (pending_amount.cmp(Decimal.pow(10, 225)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 225) ** 0.5 * 225
                )
            if (pending_amount.cmp(Decimal.pow(10, 700)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 700))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 700))
            if (pending_amount.sub(game.antispice[3]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 5:
            pending_amount = game.spent_atomic_spice[4]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
                .div(5.587e15)
                .mul(blue_amount)
            if (pending_amount.cmp(Decimal.pow(10, 40)) >= 0)
                pending_amount = pending_amount
                    .div(Decimal.pow(10, 40))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 40))
            if (pending_amount.cmp(Decimal.pow(10, 125)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 125) ** 0.5 * 125
                )
            if (pending_amount.sub(game.antispice[4]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 6:
            pending_amount = game.spent_atomic_spice[5]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
                .div(8.098e34)
                .mul(pink_amount)
            if (pending_amount.cmp(Decimal.pow(10, 88)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 88) ** 0.5 * 88
                )
            if (pending_amount.sub(game.antispice[5]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 7:
            if (
                Math.floor(atomic_amount + rainbow_amount) >
                game.total_rainbow_antispice
            )
                can_collide = true
            break
    }

    if (can_collide) {
        if (game.collider_animation) {
            let p = 12

            switch (game.collider_tab) {
                case 0:
                    p += Math.floor(
                        game.atomic_spice
                            .mul(game.atomic_portion)
                            .pow(game.atomic_efficiency + game.dark_efficiency)
                            .log(10000)
                    )
                    if (p > 30) p = 30
                    break
                case 1:
                    pending_amount = game.spent_atomic_spice[0]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) / 76
                        )
                    if (pending_amount.cmp(Decimal.pow(10, 170)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 170))
                            .pow(0.6)
                            .mul(Decimal.pow(10, 170))
                    if (pending_amount.cmp(Decimal.pow(10, 515)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 515) ** 0.67 * 515
                        )
                    if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 1000))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 1000))
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 2:
                    pending_amount = game.spent_atomic_spice[1]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) /
                                228
                        )
                        .div(3.2)
                        .mul(red_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 128)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 128))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 128))
                    if (pending_amount.cmp(Decimal.pow(10, 269)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 269))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 269))
                    if (pending_amount.cmp(Decimal.pow(10, 450)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 450) ** 0.5 * 450
                        )
                    if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 1000))
                            .pow(2)
                            .mul(Decimal.pow(10, 1000))
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 3:
                    pending_amount = game.spent_atomic_spice[2]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) /
                                304
                        )
                        .div(54)
                        .mul(yellow_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 87)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 87))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 87))
                    if (pending_amount.cmp(Decimal.pow(10, 372)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 372) ** 0.5 * 372
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 4:
                    pending_amount = game.spent_atomic_spice[3]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) /
                                380
                        )
                        .div(108000)
                        .mul(green_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 56)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 56))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 56))
                    if (pending_amount.cmp(Decimal.pow(10, 225)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 225) ** 0.5 * 225
                        )
                    if (pending_amount.cmp(Decimal.pow(10, 700)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 700))
                            .pow(0.5)
                            .mul(Decimal.pow(10, 700))
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 5:
                    pending_amount = game.spent_atomic_spice[4]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) /
                                494
                        )
                        .div(5.587e15)
                        .mul(blue_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 40)) >= 0)
                        pending_amount = pending_amount
                            .div(Decimal.pow(10, 40))
                            .pow(0.55)
                            .mul(Decimal.pow(10, 40))
                    if (pending_amount.cmp(Decimal.pow(10, 125)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 125) ** 0.5 * 125
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 6:
                    pending_amount = game.spent_atomic_spice[5]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(
                            (game.atomic_efficiency + game.dark_efficiency) /
                                608
                        )
                        .div(8.098e34)
                        .mul(pink_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 88)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 88) ** 0.5 * 88
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 7:
                    p += Math.floor((atomic_amount + rainbow_amount) / 2)
                    if (p > 30) p = 30
                    break
            }

            collider.enabled = true
            collider.time = 0
            collider.particles = p
            collider.type = game.collider_tab

            document.getElementById("collider_view").style.display = "block"
            document.getElementById("collider_view2").style.display = "none"
            document.getElementById("collider_view3").style.display = "none"

            large_particle.particles[0].x = -700
            large_particle.particles[0].dir = 1
            large_particle.particles[1].x = 700
            large_particle.particles[1].dir = -1

            for (let i = 0; i < p; i++) {
                particle.particles[i].x = 0
                particle.particles[i].y = 0
                particle.particles[i].type = Math.floor(Math.random() * 2)
                if (Math.random() < 0.025 && p >= 20)
                    particle.particles[i].type = 2

                particle.particles[i].speed = Math.round(
                    15 + Math.random() * 15
                )
                particle.particles[i].dir =
                    (2 * (i + (Math.random() * 0.5 - 0.25)) * Math.PI) / p

                switch (particle.particles[i].type) {
                    case 0:
                        particle.particles[i].delta = 0
                        break
                    case 1:
                        particle.particles[i].delta =
                            Math.random() * Math.PI * 0.2 - Math.PI * 0.1
                        if (p < 16)
                            particle.particles[i].delta =
                                Math.random() * Math.PI * 0.1 - Math.PI * 0.05
                        particle.particles[i].speed = Math.round(
                            20 + Math.random() * 10
                        )
                        if (Math.abs(particle.particles[i].delta > 0.1))
                            particle.particles[i].speed = Math.round(
                                30 + Math.random() * 5
                            )
                        break
                    case 2:
                        if (Math.random() > 0.5) {
                            particle.particles[i].delta =
                                Math.random() * Math.PI * 0.05 + Math.PI * 0.05
                        } else {
                            particle.particles[i].delta =
                                -Math.random() * Math.PI * 0.05 - Math.PI * 0.05
                        }
                        particle.particles[i].speed = Math.round(
                            40 + Math.random() * 10
                        )
                        break
                }

                particle.particles[i].speed_init = particle.particles[i].speed
            }

            let col = document.getElementById("collider_view")
            let ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
            col = document.getElementById("collider_view2")
            ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
            col = document.getElementById("collider_view3")
            ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
        } else {
            if (game.collider_tab === 0) {
                game.total_unstable_spice = game.total_unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency + game.dark_efficiency)
                        .floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency + game.dark_efficiency)
                        .floor()
                )
                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )

                if (!entry_unlocked[9]) entry_unlock(9)
            } else if (game.collider_tab === 1) {
                game.spent_atomic_spice[0] = game.spent_atomic_spice[0].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                let amount = game.spent_atomic_spice[0].pow(
                    (game.atomic_efficiency + game.dark_efficiency) / 76
                )
                if (amount.cmp(Decimal.pow(10, 170)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 170))
                        .pow(0.6)
                        .mul(Decimal.pow(10, 170))
                if (amount.cmp(Decimal.pow(10, 515)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 515) ** 0.67 * 515
                    )
                if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 1000))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 1000))
                if (amount.floor().cmp(game.antispice[0]) >= 0)
                    game.antispice[0] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 2) {
                game.spent_atomic_spice[1] = game.spent_atomic_spice[1].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[1]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
                    .div(3.2)
                    .mul(red_amount)
                if (amount.cmp(Decimal.pow(10, 128)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 128))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 128))
                if (amount.cmp(Decimal.pow(10, 269)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 269))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 269))
                if (amount.cmp(Decimal.pow(10, 450)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 450) ** 0.5 * 450
                    )
                if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 1000))
                        .pow(2)
                        .mul(Decimal.pow(10, 1000))
                if (amount.floor().cmp(game.antispice[1]) >= 0)
                    game.antispice[1] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 3) {
                game.spent_atomic_spice[2] = game.spent_atomic_spice[2].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[2]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
                    .div(54)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 87)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 87))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 87))
                if (amount.cmp(Decimal.pow(10, 372)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 372) ** 0.5 * 372
                    )
                if (amount.floor().cmp(game.antispice[2]) >= 0)
                    game.antispice[2] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 4) {
                game.spent_atomic_spice[3] = game.spent_atomic_spice[3].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[3]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
                    .div(108000)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 56)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 56))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 56))
                if (amount.cmp(Decimal.pow(10, 225)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 225) ** 0.5 * 225
                    )
                if (amount.cmp(Decimal.pow(10, 700)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 700))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 700))
                if (amount.floor().cmp(game.antispice[3]) >= 0)
                    game.antispice[3] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 5) {
                game.spent_atomic_spice[4] = game.spent_atomic_spice[4].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[4]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
                    .div(5.587e15)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 40)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 40))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 40))
                if (amount.cmp(Decimal.pow(10, 125)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 125) ** 0.5 * 125
                    )
                if (amount.floor().cmp(game.antispice[4]) >= 0)
                    game.antispice[4] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 6) {
                game.spent_atomic_spice[5] = game.spent_atomic_spice[5].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                let amount = game.spent_atomic_spice[5]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
                    .div(8.098e34)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 88)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 88) ** 0.5 * 88)
                if (amount.floor().cmp(game.antispice[5]) >= 0)
                    game.antispice[5] = amount.floor()

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 7) {
                game.spent_atomic_spice[6] = game.spent_atomic_spice[6].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )

                atomic_amount =
                    (game.spent_atomic_spice[6].log(10) - 32768) / 1984
                if (atomic_amount > 0.5)
                    atomic_amount =
                        ((atomic_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else atomic_amount = 0.5
                if (atomic_amount > 24) {
                    if (game.galactic_bought[7])
                        atomic_amount = (atomic_amount - 24) ** 0.54 + 24
                    else atomic_amount = 24
                }

                let old_total = game.total_rainbow_antispice
                game.total_rainbow_antispice = Math.floor(
                    atomic_amount + rainbow_amount
                )
                game.antispice[6] += game.total_rainbow_antispice - old_total

                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            }
        }
    }
}

//spice collider automation
function auto_collider() {
    let can_collide = false
    let available_spice = new Array(8).fill(false)

    let red_amount = Decimal.pow(
        10,
        (game.antitotal_spice[1].log(10) / 1e11) ** 0.5
    ).div(17)
    if (red_amount.cmp(Decimal.pow(10, 2319)) >= 0)
        red_amount = Decimal.pow(10, (red_amount.log(10) / 2319) ** 0.5 * 2319)
    let yellow_amount = Decimal.pow(
        10,
        (game.antitotal_spice[2].log(10) / 2e11) ** 0.5
    ).div(38.5)
    if (yellow_amount.cmp(Decimal.pow(10, 1019)) >= 0)
        yellow_amount = Decimal.pow(
            10,
            (yellow_amount.log(10) / 1019) ** 0.4 * 1019
        )
    let green_amount = Decimal.pow(
        10,
        (game.antitotal_spice[3].log(10) / 3e11) ** 0.5
    ).div(2340)
    if (green_amount.cmp(Decimal.pow(10, 504)) >= 0)
        green_amount = Decimal.pow(
            10,
            (green_amount.log(10) / 504) ** 0.75 * 504
        )
    let blue_amount = Decimal.pow(
        10,
        (game.antitotal_spice[4].log(10) / 5e11) ** 0.5
    ).div(8.667e9)
    if (blue_amount.cmp(Decimal.pow(10, 216)) >= 0)
        blue_amount = Decimal.pow(10, (blue_amount.log(10) / 216) ** 0.8 * 216)
    let pink_amount = Decimal.pow(
        10,
        (game.antitotal_spice[5].log(10) / 8e11) ** 0.5
    ).div(2.255e9)
    if (pink_amount.cmp(Decimal.pow(10, 70)) >= 0)
        pink_amount = Decimal.pow(10, (pink_amount.log(10) / 70) ** 0.6 * 70)
    let rainbow_amount = (game.antitotal_spice[6].log(10) - 28550000) / 5400000
    if (rainbow_amount > 0.5)
        rainbow_amount = ((rainbow_amount - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
    else rainbow_amount = 0.5
    if (rainbow_amount > 24) {
        if (game.galactic_bought[7])
            rainbow_amount = (rainbow_amount - 24) ** 0.54 + 24
        else rainbow_amount = 24
    }
    let atomic_amount2 =
        (game.spent_atomic_spice[6]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .log(10) -
            32768) /
        1984
    if (atomic_amount2 > 0.5)
        atomic_amount2 = ((atomic_amount2 - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
    else atomic_amount2 = 0.5
    if (atomic_amount2 > 24) {
        if (game.galactic_bought[7])
            atomic_amount2 = (atomic_amount2 - 24) ** 0.54 + 24
        else atomic_amount2 = 24
    }

    let pending_amount = new Decimal(0)

    if (
        game.atomic_spice
            .mul(game.atomic_portion)
            .pow(game.atomic_efficiency + game.dark_efficiency)
            .cmp(game.total_unstable_spice) >= 0
    )
        can_collide = true

    if (game.research_complete[21] >= 1) {
        pending_amount = game.spent_atomic_spice[0]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 76)
        if (pending_amount.cmp(Decimal.pow(10, 170)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 170))
                .pow(0.6)
                .mul(Decimal.pow(10, 170))
        if (pending_amount.cmp(Decimal.pow(10, 515)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 515) ** 0.67 * 515
            )
        if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 1000))
                .pow(0.5)
                .mul(Decimal.pow(10, 1000))
        if (pending_amount.sub(game.antispice[0]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[1] = true
        }
    }

    if (game.research_complete[23] >= 1) {
        pending_amount = game.spent_atomic_spice[1]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
            .div(3.2)
            .mul(red_amount)
        if (pending_amount.cmp(Decimal.pow(10, 128)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 128))
                .pow(0.5)
                .mul(Decimal.pow(10, 128))
        if (pending_amount.cmp(Decimal.pow(10, 269)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 269))
                .pow(0.5)
                .mul(Decimal.pow(10, 269))
        if (pending_amount.cmp(Decimal.pow(10, 450)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 450) ** 0.5 * 450
            )
        if (pending_amount.cmp(Decimal.pow(10, 1000)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 1000))
                .pow(2)
                .mul(Decimal.pow(10, 1000))
        if (pending_amount.sub(game.antispice[1]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[2] = true
        }
    }

    if (game.research_complete[26] >= 1) {
        pending_amount = game.spent_atomic_spice[2]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
            .div(54)
            .mul(yellow_amount)
        if (pending_amount.cmp(Decimal.pow(10, 87)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 87))
                .pow(0.55)
                .mul(Decimal.pow(10, 87))
        if (pending_amount.cmp(Decimal.pow(10, 372)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 372) ** 0.5 * 372
            )
        if (pending_amount.sub(game.antispice[2]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[3] = true
        }
    }

    if (game.research_complete[29] >= 1) {
        pending_amount = game.spent_atomic_spice[3]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
            .div(108000)
            .mul(green_amount)
        if (pending_amount.cmp(Decimal.pow(10, 56)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 56))
                .pow(0.55)
                .mul(Decimal.pow(10, 56))
        if (pending_amount.cmp(Decimal.pow(10, 225)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 225) ** 0.5 * 225
            )
        if (pending_amount.cmp(Decimal.pow(10, 700)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 700))
                .pow(0.5)
                .mul(Decimal.pow(10, 700))
        if (pending_amount.sub(game.antispice[3]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[4] = true
        }
    }

    if (game.research_complete[33] >= 1) {
        pending_amount = game.spent_atomic_spice[4]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
            .div(5.587e15)
            .mul(blue_amount)
        if (pending_amount.cmp(Decimal.pow(10, 40)) >= 0)
            pending_amount = pending_amount
                .div(Decimal.pow(10, 40))
                .pow(0.55)
                .mul(Decimal.pow(10, 40))
        if (pending_amount.cmp(Decimal.pow(10, 125)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 125) ** 0.5 * 125
            )
        if (pending_amount.sub(game.antispice[4]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[5] = true
        }
    }

    if (game.research_complete[36] >= 1) {
        pending_amount = game.spent_atomic_spice[5]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
            .div(8.098e34)
            .mul(pink_amount)
        if (pending_amount.cmp(Decimal.pow(10, 88)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 88) ** 0.5 * 88
            )
        if (pending_amount.sub(game.antispice[5]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[6] = true
        }
    }

    if (game.research_complete[39] >= 1) {
        if (
            Math.floor(atomic_amount2 + rainbow_amount) >
            game.total_rainbow_antispice
        ) {
            can_collide = true
            available_spice[7] = true
        }
    }

    if (can_collide) {
        available_spice[0] = true
        let unlock_index = [undefined, 19, 21, 24, 27, 30, 33, 37]

        if (game.collider_animation) {
            let p = 12

            let spices_unlocked = 0
            for (let i = 0; i < 8; i++) {
                if (i === 0) {
                    if (available_spice[i]) spices_unlocked++
                } else {
                    if (
                        available_spice[i] &&
                        game.research_complete[unlock_index[i]] >= 0
                    )
                        spices_unlocked++
                }
            }
            let atomic_amount = game.atomic_spice
                .mul(game.atomic_portion)
                .div(spices_unlocked)

            let highest_spice = 0

            let unstable_gain = atomic_amount.pow(
                game.atomic_efficiency + game.dark_efficiency
            )
            let basic_gain = game.spent_atomic_spice[0]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 76)
                .floor()
            if (basic_gain.cmp(Decimal.pow(10, 170)) >= 0)
                basic_gain = basic_gain
                    .div(Decimal.pow(10, 170))
                    .pow(0.6)
                    .mul(Decimal.pow(10, 170))
            if (basic_gain.cmp(Decimal.pow(10, 515)) >= 0)
                basic_gain = Decimal.pow(
                    10,
                    (basic_gain.log(10) / 515) ** 0.67 * 515
                )
            if (basic_gain.cmp(Decimal.pow(10, 1000)) >= 0)
                basic_gain = basic_gain
                    .div(Decimal.pow(10, 1000))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 1000))
            if (
                basic_gain.cmp(game.antispice[0]) === 1 &&
                game.research_complete[21] >= 1
            )
                highest_spice = 1
            let red_gain = game.spent_atomic_spice[1]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
                .div(3.2)
                .mul(red_amount)
                .floor()
            if (red_gain.cmp(Decimal.pow(10, 128)) >= 0)
                red_gain = red_gain
                    .div(Decimal.pow(10, 128))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 128))
            if (red_gain.cmp(Decimal.pow(10, 269)) >= 0)
                red_gain = red_gain
                    .div(Decimal.pow(10, 269))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 269))
            if (red_gain.cmp(Decimal.pow(10, 450)) >= 0)
                red_gain = Decimal.pow(
                    10,
                    (red_gain.log(10) / 450) ** 0.5 * 450
                )
            if (red_gain.cmp(Decimal.pow(10, 1000)) >= 0)
                red_gain = red_gain
                    .div(Decimal.pow(10, 1000))
                    .pow(2)
                    .mul(Decimal.pow(10, 1000))
            if (
                red_gain.cmp(game.antispice[1]) === 1 &&
                game.research_complete[23] >= 1
            )
                highest_spice = 2
            let yellow_gain = game.spent_atomic_spice[2]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
                .div(54)
                .mul(yellow_amount)
                .floor()
            if (yellow_gain.cmp(Decimal.pow(10, 87)) >= 0)
                yellow_gain = yellow_gain
                    .div(Decimal.pow(10, 87))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 87))
            if (yellow_gain.cmp(Decimal.pow(10, 372)) >= 0)
                yellow_gain = Decimal.pow(
                    10,
                    (yellow_gain.log(10) / 372) ** 0.5 * 372
                )
            if (
                yellow_gain.cmp(game.antispice[2]) === 1 &&
                game.research_complete[26] >= 1
            )
                highest_spice = 3
            let green_gain = game.spent_atomic_spice[3]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
                .div(108000)
                .mul(green_amount)
                .floor()
            if (green_gain.cmp(Decimal.pow(10, 56)) >= 0)
                green_gain = green_gain
                    .div(Decimal.pow(10, 56))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 56))
            if (green_gain.cmp(Decimal.pow(10, 225)) >= 0)
                green_gain = Decimal.pow(
                    10,
                    (green_gain.log(10) / 225) ** 0.5 * 225
                )
            if (green_gain.cmp(Decimal.pow(10, 700)) >= 0)
                green_gain = green_gain
                    .div(Decimal.pow(10, 700))
                    .pow(0.5)
                    .mul(Decimal.pow(10, 700))
            if (
                green_gain.cmp(game.antispice[3]) === 1 &&
                game.research_complete[29] >= 1
            )
                highest_spice = 4
            let blue_gain = game.spent_atomic_spice[4]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
                .div(5.587e15)
                .mul(blue_amount)
                .floor()
            if (blue_gain.cmp(Decimal.pow(10, 40)) >= 0)
                blue_gain = blue_gain
                    .div(Decimal.pow(10, 40))
                    .pow(0.55)
                    .mul(Decimal.pow(10, 40))
            if (blue_gain.cmp(Decimal.pow(10, 125)) >= 0)
                blue_gain = Decimal.pow(
                    10,
                    (blue_gain.log(10) / 125) ** 0.5 * 125
                )
            if (
                blue_gain.cmp(game.antispice[4]) === 1 &&
                game.research_complete[33] >= 1
            )
                highest_spice = 5
            let pink_gain = game.spent_atomic_spice[5]
                .add(atomic_amount)
                .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
                .div(8.098e34)
                .mul(pink_amount)
                .floor()
            if (pink_gain.cmp(Decimal.pow(10, 88)) >= 0)
                pink_gain = Decimal.pow(
                    10,
                    (pink_gain.log(10) / 88) ** 0.5 * 88
                )
            if (
                pink_gain.cmp(game.antispice[5]) === 1 &&
                game.research_complete[36] >= 1
            )
                highest_spice = 6
            let rainbow_gain = Math.floor(rainbow_amount + atomic_amount2)
            if (
                rainbow_gain > game.total_rainbow_antispice &&
                game.research_complete[39] >= 1
            )
                highest_spice = 7

            switch (highest_spice) {
                case 0:
                    p += Math.floor(unstable_gain.log(10000))
                    if (p > 30) p = 30
                    break
                case 1:
                    p += Math.floor(basic_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 2:
                    p += Math.floor(red_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 3:
                    p += Math.floor(yellow_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 4:
                    p += Math.floor(green_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 5:
                    p += Math.floor(blue_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 6:
                    p += Math.floor(pink_gain.log(100))
                    if (p > 30) p = 30
                    break
                case 7:
                    p += Math.floor(rainbow_gain / 2)
                    if (p > 30) p = 30
                    break
            }

            collider.enabled = true
            collider.time = 0
            collider.particles = p
            collider.type = highest_spice + 8

            document.getElementById("collider_view").style.display = "block"
            document.getElementById("collider_view2").style.display = "none"
            document.getElementById("collider_view3").style.display = "none"

            large_particle.particles[0].x = -700
            large_particle.particles[0].dir = 1
            large_particle.particles[1].x = 700
            large_particle.particles[1].dir = -1

            for (let i = 0; i < p; i++) {
                particle.particles[i].x = 0
                particle.particles[i].y = 0
                particle.particles[i].type = Math.floor(Math.random() * 2)
                if (Math.random() < 0.025 && p >= 20)
                    particle.particles[i].type = 2

                particle.particles[i].speed = Math.round(
                    15 + Math.random() * 15
                )
                particle.particles[i].dir =
                    (2 * (i + (Math.random() * 0.5 - 0.25)) * Math.PI) / p

                switch (particle.particles[i].type) {
                    case 0:
                        particle.particles[i].delta = 0
                        break
                    case 1:
                        particle.particles[i].delta =
                            Math.random() * Math.PI * 0.2 - Math.PI * 0.1
                        if (p < 16)
                            particle.particles[i].delta =
                                Math.random() * Math.PI * 0.1 - Math.PI * 0.05
                        particle.particles[i].speed = Math.round(
                            20 + Math.random() * 10
                        )
                        if (Math.abs(particle.particles[i].delta > 0.1))
                            particle.particles[i].speed = Math.round(
                                30 + Math.random() * 5
                            )
                        break
                    case 2:
                        if (Math.random() > 0.5) {
                            particle.particles[i].delta =
                                Math.random() * Math.PI * 0.05 + Math.PI * 0.05
                        } else {
                            particle.particles[i].delta =
                                -Math.random() * Math.PI * 0.05 - Math.PI * 0.05
                        }
                        particle.particles[i].speed = Math.round(
                            40 + Math.random() * 10
                        )
                        break
                }

                particle.particles[i].speed_init = particle.particles[i].speed
            }

            let col = document.getElementById("collider_view")
            let ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
            col = document.getElementById("collider_view2")
            ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
            col = document.getElementById("collider_view3")
            ctx = col.getContext("2d")
            ctx.clearRect(0, 0, col.width, col.height)
        } else {
            let spices_unlocked = 0
            for (let i = 0; i < 8; i++) {
                if (i === 0) {
                    if (available_spice[i]) spices_unlocked++
                } else {
                    if (
                        available_spice[i] &&
                        game.research_complete[unlock_index[i]] >= 0
                    )
                        spices_unlocked++
                }
            }
            let atomic_amount = game.atomic_spice
                .mul(game.atomic_portion)
                .div(spices_unlocked)

            if (available_spice[0]) {
                game.total_unstable_spice = game.total_unstable_spice.add(
                    atomic_amount
                        .pow(game.atomic_efficiency + game.dark_efficiency)
                        .floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    atomic_amount
                        .pow(game.atomic_efficiency + game.dark_efficiency)
                        .floor()
                )
            }

            if (game.research_complete[21] >= 1 && available_spice[1]) {
                game.spent_atomic_spice[0] =
                    game.spent_atomic_spice[0].add(atomic_amount)
                let amount = game.spent_atomic_spice[0].pow(
                    (game.atomic_efficiency + game.dark_efficiency) / 76
                )
                if (amount.cmp(Decimal.pow(10, 170)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 170))
                        .pow(0.6)
                        .mul(Decimal.pow(10, 170))
                if (amount.cmp(Decimal.pow(10, 515)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 515) ** 0.67 * 515
                    )
                if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 1000))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 1000))
                if (amount.floor().cmp(game.antispice[0]) >= 0)
                    game.antispice[0] = amount.floor()
            }

            if (game.research_complete[23] >= 1 && available_spice[2]) {
                game.spent_atomic_spice[1] =
                    game.spent_atomic_spice[1].add(atomic_amount)
                let amount = game.spent_atomic_spice[1]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 228)
                    .div(3.2)
                    .mul(red_amount)
                if (amount.cmp(Decimal.pow(10, 128)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 128))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 128))
                if (amount.cmp(Decimal.pow(10, 269)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 269))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 269))
                if (amount.cmp(Decimal.pow(10, 450)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 450) ** 0.5 * 450
                    )
                if (amount.cmp(Decimal.pow(10, 1000)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 1000))
                        .pow(2)
                        .mul(Decimal.pow(10, 1000))
                if (amount.floor().cmp(game.antispice[1]) >= 0)
                    game.antispice[1] = amount.floor()
            }

            if (game.research_complete[26] >= 1 && available_spice[3]) {
                game.spent_atomic_spice[2] =
                    game.spent_atomic_spice[2].add(atomic_amount)
                let amount = game.spent_atomic_spice[2]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 304)
                    .div(54)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 87)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 87))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 87))
                if (amount.cmp(Decimal.pow(10, 372)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 372) ** 0.5 * 372
                    )
                if (amount.floor().cmp(game.antispice[2]) >= 0)
                    game.antispice[2] = amount.floor()
            }

            if (game.research_complete[29] >= 1 && available_spice[4]) {
                game.spent_atomic_spice[3] =
                    game.spent_atomic_spice[3].add(atomic_amount)
                let amount = game.spent_atomic_spice[3]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 380)
                    .div(108000)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 56)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 56))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 56))
                if (amount.cmp(Decimal.pow(10, 225)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 225) ** 0.5 * 225
                    )
                if (amount.cmp(Decimal.pow(10, 700)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 700))
                        .pow(0.5)
                        .mul(Decimal.pow(10, 700))
                if (amount.floor().cmp(game.antispice[3]) >= 0)
                    game.antispice[3] = amount.floor()
            }

            if (game.research_complete[33] >= 1 && available_spice[5]) {
                game.spent_atomic_spice[4] =
                    game.spent_atomic_spice[4].add(atomic_amount)
                let amount = game.spent_atomic_spice[4]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 494)
                    .div(5.587e15)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 40)) >= 0)
                    amount = amount
                        .div(Decimal.pow(10, 40))
                        .pow(0.55)
                        .mul(Decimal.pow(10, 40))
                if (amount.cmp(Decimal.pow(10, 125)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 125) ** 0.5 * 125
                    )
                if (amount.floor().cmp(game.antispice[4]) >= 0)
                    game.antispice[4] = amount.floor()
            }

            if (game.research_complete[36] >= 1 && available_spice[6]) {
                game.spent_atomic_spice[5] =
                    game.spent_atomic_spice[5].add(atomic_amount)
                let amount = game.spent_atomic_spice[5]
                    .pow((game.atomic_efficiency + game.dark_efficiency) / 608)
                    .div(8.098e34)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 88)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 88) ** 0.5 * 88)
                if (amount.floor().cmp(game.antispice[5]) >= 0)
                    game.antispice[5] = amount.floor()
            }

            if (game.research_complete[39] >= 1 && available_spice[7]) {
                game.spent_atomic_spice[6] =
                    game.spent_atomic_spice[6].add(atomic_amount)

                atomic_amount2 =
                    (game.spent_atomic_spice[6].log(10) - 32768) / 1984
                if (atomic_amount2 > 0.5)
                    atomic_amount2 =
                        ((atomic_amount2 - 0.5) / 23.5) ** 1.5 * 23.5 + 0.5
                else atomic_amount2 = 0.5
                if (atomic_amount2 > 24) {
                    if (game.galactic_bought[7])
                        atomic_amount2 = (atomic_amount2 - 24) ** 0.54 + 24
                    else atomic_amount2 = 24
                }

                let old_total = game.total_rainbow_antispice
                game.total_rainbow_antispice = Math.floor(
                    atomic_amount2 + rainbow_amount
                )
                game.antispice[6] += game.total_rainbow_antispice - old_total
            }

            game.atomic_spice = game.atomic_spice.mul(1 - game.atomic_portion)
        }
    }
}

//begin/pause/resume research
function research_toggle() {
    if (game.research_view !== 0) {
        if (!game.research_pause) {
            if (game.research_view === game.research_select) {
                game.research_pause = true
                game.research_select = 0
            }
        } else if (
            game.research_complete[game.research_view - 1] === 0 ||
            research.researches[game.research_view - 1].repeat > 0
        ) {
            game.research_pause = false
            game.research_select = game.research_view
        }
    }
}

//view research upgrade
function research_view(id) {
    game.research_view = id
}

//upgrading research speed
function research_upgrade(max) {
    if (max) {
        while (
            game.atomic_spice.cmp(
                Decimal.pow(
                    game.data_boosts + Math.PI / 2,
                    game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                )
                    .mul(4096)
                    .round()
            ) >= 0
        ) {
            game.atomic_spice = Decimal.max(
                game.atomic_spice.sub(
                    Decimal.pow(
                        game.data_boosts + Math.PI / 2,
                        game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                    )
                        .mul(4096)
                        .round()
                ),
                0
            )
            game.data_boosts++
        }
    } else {
        if (
            game.atomic_spice.cmp(
                Decimal.pow(
                    game.data_boosts + Math.PI / 2,
                    game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                )
                    .mul(4096)
                    .round()
            ) >= 0
        ) {
            game.atomic_spice = Decimal.max(
                game.atomic_spice.sub(
                    Decimal.pow(
                        game.data_boosts + Math.PI / 2,
                        game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                    )
                        .mul(4096)
                        .round()
                ),
                0
            )
            game.data_boosts++
        }
    }
}

//entering a collapse challenge
function pre_enter_collapse_challenge(id) {
    if (game.collapse_challenge === 0) {
        if (game.challenge_confirm) {
            if (modal === "none") {
                open_modal(
                    "confirm",
                    "Are you sure you want to enter Challenge " +
                        format_num(id, 0) +
                        "? You will Collapse!",
                    function () {
                        enter_collapse_challenge(id)
                    }
                )
            }
        } else {
            enter_collapse_challenge(id)
        }
    } else {
        if (game.collapse_challenge === id) {
            pre_collapse()
        } else {
            if (modal === "none") {
                open_modal(
                    "alert",
                    "You cannot enter a Collapse Challenge if you are already in one!"
                )
            }
        }
    }
}

function enter_collapse_challenge(id) {
    collapse(true)
    game.collapse_challenge = id
    game.pending_completions = 0

    if (game.collapse_challenge === 7) game.ascend_challenge_timer = 0
    if (game.collapse_challenge === 9) game.gamespeed = 1 / 99999
}

//exiting a collapse challenge
function exit_collapse_challenge() {
    if (game.collapse_challenge !== 0) {
        let challenge = game.collapse_challenge
        game.collapse_challenge = 0
        pre_collapse(true, challenge)
    }
}

//buying antispice perks
function buy_antispice_perk(id) {
    let total_bought = 0
    for (let i = 0; i < 8; i++) {
        if (game.antispice_bought[i]) total_bought++
    }

    let price = antispice_perk.perks[id].price
    if (antispice_perk.perks[id].price === 0) {
        price = total_bought + 1
    }

    if (!game.antispice_bought[id] && game.antispice[6] >= price) {
        game.antispice[6] = Math.max(game.antispice[6] - price, 0)
        game.antispice_bought[id] = true
        game.antispice_order[id] = total_bought + 1

        if (!entry_unlocked[11] && id === 8) entry_unlock(11)
    }
}

//refunding antispice perks
function pre_refund_antispice_perks() {
    if (
        game.antispice[6] < game.total_rainbow_antispice &&
        !game.antispice_bought[8]
    ) {
        if (game.antispice_confirm) {
            if (modal === "none") {
                open_modal(
                    "confirm",
                    "Are you sure you want to refund all anti" +
                        spice_text[0] +
                        " perks? You will Collapse!",
                    refund_antispice_perks
                )
            }
        } else {
            refund_antispice_perks()
        }
    }
}

function refund_antispice_perks() {
    for (let i = 0; i < 8; i++) {
        if (game.antispice_bought[i])
            game.antispice[6] += game.antispice_order[i]
        game.antispice_bought[i] = false
        game.antispice_order[i] = 0
    }

    collapse(true)

    if (game.collapse_challenge === 9) {
        game.gamespeed = 1 / 99999
    } else {
        game.gamespeed = 2 ** game.collapse_complete[2]
    }
}

//reset dynamic auto-collapse goal
function collapse_goal_reset() {
    game.autoco_goal2 = new Decimal(1)
}

//buying dark constructs
function buy_construct() {
    if (game.dark_spice.cmp(game.dark_construct_price) >= 0) {
        game.dark_spice = Decimal.max(
            game.dark_spice.sub(game.dark_construct_price),
            0
        )
        if (game.dark_construct < 39)
            game.dark_construct_price = new Decimal(2 * phi)
                .mul(Number(game.dark_construct) + 5)
                .mul(Number(game.dark_construct) + 6)
        else if (game.dark_construct < 74)
            game.dark_construct_price = new Decimal(4 * phi).mul(
                Decimal.pow(Number(game.dark_construct) - 33.1537, 3).add(
                    789.177
                )
            )
        else if (game.dark_construct < 2000)
            game.dark_construct_price = game.dark_construct_price.mul(
                Decimal.min(
                    phi,
                    Decimal.pow(1.0744, Number(game.dark_construct) - 73)
                )
            )
        else game.dark_construct_price = game.dark_construct_price.mul(phi ** 4)

        game.dark_construct += 1n

        if (game.dark_construct >= 1000n) {
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 4.26677e15 * game.dark_construct.toString() -
                    6.21957e18
            )
        } else if (game.dark_construct >= 130n) {
            let construct_index = game.dark_construct - 73n
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 7.48125e15 * (construct_index.toString() / 57) ** 2
            )
        } else if (game.dark_construct >= 75n) {
            let construct_index = game.dark_construct - 73n
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 1.3125e14 * construct_index.toString()
            )
        } else {
            game.dark_construct_boost = Decimal.pow(
                10,
                (Math.E * 3.5e12 * Number(game.dark_construct)) **
                    ((Number(game.dark_construct) + 1) / 76)
            ).div(12)
        }

        if (game.dark_spice.cmp(0) < 0) game.dark_spice = new Decimal(0)
    }
}

//maxing dark constructs
function max_construct() {
    if (game.dark_spice.cmp(game.dark_construct_price) >= 0) {
        let n = 0n
        if (game.dark_construct < 100) {
            while (game.dark_spice.cmp(game.dark_construct_price) >= 0) {
                game.dark_spice = Decimal.max(
                    game.dark_spice.sub(game.dark_construct_price),
                    0
                )
                if (game.dark_construct < 39)
                    game.dark_construct_price = new Decimal(2 * phi)
                        .mul(Number(game.dark_construct) + 5)
                        .mul(Number(game.dark_construct) + 6)
                else if (game.dark_construct < 74)
                    game.dark_construct_price = new Decimal(4 * phi).mul(
                        Decimal.pow(
                            Number(game.dark_construct) - 33.1537,
                            3
                        ).add(789.177)
                    )
                else
                    game.dark_construct_price = game.dark_construct_price.mul(
                        Decimal.min(
                            phi,
                            Decimal.pow(
                                1.0744,
                                Number(game.dark_construct) - 73
                            )
                        )
                    )
                game.dark_construct += 1n
            }
        }
        if (game.dark_construct < 2000) {
            n = BigInt(
                Math.floor(
                    Decimal.sub(
                        1,
                        game.dark_spice
                            .mul(1 - phi)
                            .div(game.dark_construct_price)
                    ).log(10) / Math.log10(phi)
                )
            )
            if (game.dark_construct + n >= 2000n)
                n = 2000n - game.dark_construct
            if (n > 0n) {
                let price = game.dark_construct_price
                    .mul(Decimal.sub(1, Decimal.pow(phi, n.toString())))
                    .div(1 - phi)
                game.dark_spice = Decimal.max(game.dark_spice.sub(price), 0)
                game.dark_construct_price = game.dark_construct_price.mul(
                    Decimal.pow(phi, n.toString())
                )
                game.dark_construct += n
            }
        }
        n = BigInt(
            Math.floor(
                Decimal.sub(
                    1,
                    game.dark_spice
                        .mul(1 - phi ** 4)
                        .div(game.dark_construct_price)
                ).log(10) / Math.log10(phi ** 4)
            )
        )
        if (n > 0n) {
            let price = game.dark_construct_price
                .mul(Decimal.sub(1, Decimal.pow(phi, 4 * n.toString())))
                .div(1 - phi ** 4)
            game.dark_spice = Decimal.max(game.dark_spice.sub(price), 0)
            game.dark_construct_price = game.dark_construct_price.mul(
                Decimal.pow(phi, 4 * n.toString())
            )
            game.dark_construct += n
        }

        if (game.dark_construct >= 1000n) {
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 4.26677e15 * game.dark_construct.toString() -
                    6.21957e18
            )
        } else if (game.dark_construct >= 130n) {
            let construct_index = game.dark_construct - 73n
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 7.48125e15 * (construct_index.toString() / 57) ** 2
            )
        } else if (game.dark_construct >= 75n) {
            let construct_index = game.dark_construct - 73n
            game.dark_construct_boost = Decimal.pow(
                10,
                Math.E * 1.3125e14 * construct_index.toString()
            )
        } else {
            game.dark_construct_boost = Decimal.pow(
                10,
                (Math.E * 3.5e12 * Number(game.dark_construct)) **
                    ((Number(game.dark_construct) + 1) / 76)
            ).div(12)
        }

        if (game.dark_spice.cmp(0) < 0) game.dark_spice = new Decimal(0)
    }
}

//buying dark conversions
function buy_conversion() {
    if (game.dark_spice.cmp(game.dark_conversion_price) >= 0) {
        game.dark_spice = Decimal.max(
            game.dark_spice.sub(game.dark_conversion_price),
            0
        )

        if (game.dark_conversion < 4)
            game.dark_conversion_price = game.dark_conversion_price.mul(phi)
        else
            game.dark_conversion_price = game.dark_conversion_price.mul(
                Decimal.pow(phi, game.dark_conversion - 2)
            )

        game.dark_conversion++

        game.dark_efficiency =
            0.1 * (game.dark_conversion + 5) ** 0.5 - 0.1 * 5 ** 0.5

        if (game.dark_spice.cmp(0) < 0) game.dark_spice = new Decimal(0)
    }
}

//maxing dark conversion
function max_conversion() {
    if (game.dark_spice.cmp(game.dark_conversion_price) >= 0) {
        while (game.dark_spice.cmp(game.dark_conversion_price) >= 0) {
            game.dark_spice = Decimal.max(
                game.dark_spice.sub(game.dark_conversion_price),
                0
            )

            if (game.dark_conversion < 4)
                game.dark_conversion_price = game.dark_conversion_price.mul(phi)
            else
                game.dark_conversion_price = game.dark_conversion_price.mul(
                    Decimal.pow(phi, game.dark_conversion - 2)
                )

            game.dark_conversion++
        }

        game.dark_efficiency =
            0.1 * (game.dark_conversion + 5) ** 0.5 - 0.1 * 5 ** 0.5

        if (game.dark_spice.cmp(0) < 0) game.dark_spice = new Decimal(0)
    }
}

//buying galactic upgrades
function buy_galactic_upgrade(id) {
    if (
        game.galactic_shards.cmp(galactic_upgrade.upgrades[id].price) >= 0 &&
        !game.galactic_bought[id] &&
        (game.galactic_bought[0] || id === 0)
    ) {
        game.galactic_shards = Decimal.max(
            game.galactic_shards.sub(galactic_upgrade.upgrades[id].price),
            0
        )
        game.galactic_bought[id] = true
    }
}

//upgrading the realm limit
function upgrade_capacity() {
    if (game.galactic_shards.cmp(game.realm_limit_price) >= 0) {
        game.galactic_shards = Decimal.max(
            game.galactic_shards.sub(game.realm_limit_price),
            0
        )
        game.realm_limit = game.realm_limit.pow(1.15)
        game.limit_active = false
        game.realm_limit_level++
        game.realm_limit_price = fib(
            2 * game.realm_limit_level ** 2 + 18 * game.realm_limit_level + 18,
            true
        )
    }
}

//upgrading game speed effectiveness on dark spice
function upgrade_dark_gamespeed() {
    if (
        game.galactic_shards.cmp(game.dark_gamespeed_price) >= 0 &&
        game.dark_gamespeed_level < 100
    ) {
        game.galactic_shards = Decimal.max(
            game.galactic_shards.sub(game.dark_gamespeed_price),
            0
        )
        game.dark_gamespeed_level++
        if (game.dark_gamespeed_level < 10)
            game.dark_gamespeed_price = fib(
                (game.dark_gamespeed_level ** 2 +
                    7 * game.dark_gamespeed_level) /
                    2 +
                    7,
                true
            )
        else
            game.dark_gamespeed_price = fib(
                13 * game.dark_gamespeed_level - 38,
                true
            )
    }
}

//upgrading the maximum distance you can jump to a realm
function upgrade_jump_distance() {
    if (
        game.galactic_shards.cmp(game.jump_distance_price) >= 0 &&
        game.jump_distance_level < 4
    ) {
        game.galactic_shards = Decimal.max(
            game.galactic_shards.sub(game.jump_distance_price),
            0
        )
        game.jump_distance_level++
        game.jump_distance_price = fib(game.jump_distance_level * 10 + 12, true)
    }
}

//skipping offline ticks
function offline_skip(type) {
    if (type === "half") {
        if (ticks_run < Math.floor(total_ticks / 2)) {
            total_ticks = Math.floor(total_ticks / 2)
            start_ms = ticks_run * 10
            start_ticks = ticks_run
        }
    } else if (type === "all") {
        ticks_run = total_ticks - game.catchup_rate
    }
}

//leaving the title screen
function start_game() {
    let mobile = Number(
        getComputedStyle(document.body).getPropertyValue("--mobile")
    )

    document.getElementById("catchup_screen").style.display = "flex"
    document.getElementById("catchup_header").innerHTML =
        "Generating universe...<br>This may take several seconds"
    if (mobile)
        document.getElementById("catchup_header").innerHTML =
            "Generating universe...<br><br>This may take several seconds"
    document.getElementById("offline_panel").style.display = "none"
    document.getElementById("startup_panel").style.display = "none"
    document.getElementById("tabs_block").style.display = "none"
    document.getElementsByTagName("main")[0].style.display = "none"

    title_update()

    pause = true

    window.setTimeout(function () {
        begin_realm_generation(true)
    }, 200)
}
