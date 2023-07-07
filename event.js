//purchasing spice generators
function buy_gen(color, id, budget) {
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
            if (budget !== undefined) {
                if (budget >= Math.round(game.arcane_spice_price[id])) {
                    game.ansuz = Math.max(
                        game.ansuz - Math.round(game.arcane_spice_price[id]),
                        0
                    )
                    budget = Math.max(
                        budget - Math.round(game.arcane_spice_price[id]),
                        0
                    )
                    game.arcane_spice_price[id] *= 1.1
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(1)
                    game.arcane_spice_bought[id] += 1n

                    let arcane_bought = game.arcane_spice_bought[id] / 3n
                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )
                }

                return budget
            } else {
                if (game.ansuz >= Math.round(game.arcane_spice_price[id])) {
                    game.ansuz = Math.max(
                        game.ansuz - Math.round(game.arcane_spice_price[id]),
                        0
                    )
                    game.arcane_spice_price[id] *= 1.1
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(1)
                    game.arcane_spice_bought[id] += 1n

                    let arcane_bought = game.arcane_spice_bought[id] / 3n
                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )
                }
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
                    game.ascend_challenge === 1 ||
                    game.ascend_challenge === 6 ||
                    game.collapse_challenge === 7 ||
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
            if (budget !== undefined) {
                n = 3n - (game.arcane_spice_bought[id] % 3n)

                price = Math.round(
                    (game.arcane_spice_price[id] * (1 - 1.1 ** n.toString())) /
                        -0.1
                )

                if (budget >= price) {
                    game.ansuz = Math.max(game.ansuz - price, 0)
                    budget = Math.max(budget - price, 0)
                    game.arcane_spice_price[id] *= 1.1 ** n.toString()
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(
                        n.toString()
                    )
                    game.arcane_spice_bought[id] += n

                    let arcane_bought = game.arcane_spice_bought[id] / 3n
                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )

                    return budget
                }
            } else {
                n = 3n - (game.arcane_spice_bought[id] % 3n)

                price = Math.round(
                    (game.arcane_spice_price[id] * (1 - 1.1 ** n.toString())) /
                        -0.1
                )

                if (game.ansuz >= price) {
                    game.ansuz = Math.max(game.ansuz - price, 0)
                    game.arcane_spice_price[id] *= 1.1 ** n.toString()
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(
                        n.toString()
                    )
                    game.arcane_spice_bought[id] += n

                    let arcane_bought = game.arcane_spice_bought[id] / 3n
                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )
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
            if (game.ansuz >= Math.round(game.arcane_strengthener_price)) {
                game.ansuz = Math.max(
                    game.ansuz - Math.round(game.arcane_strengthener_price),
                    0
                )
                game.arcane_strengthener_price *= 8
                game.arcane_strengthener += 1

                if (
                    game.research_complete[13] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    game.free_enchantment =
                        game.arcane_enchantment / 10n +
                        BigInt(game.arcane_strengthener) * 250n
                    if (
                        game.research_complete[25] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        let collapse_free = BigInt(game.collapse) * 50n
                        if (game.collapse >= 100000)
                            collapse_free = BigInt(
                                Math.floor(
                                    2500000 *
                                        ((game.collapse - 87500) / 50000) **
                                            0.5 +
                                        3750000
                                )
                            )
                        if (game.collapse >= 31337500)
                            collapse_free = BigInt(game.collapse) + 34912500n
                        if (collapse_free > game.arcane_enchantment / 2n)
                            collapse_free = game.arcane_enchantment / 2n

                        game.free_enchantment += collapse_free
                    }
                }
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
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 7 ||
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
                        .mul(2 * 10 ** 7)
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
                        .mul(2 * 10 ** 7)
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
                        .mul(2 * 10 ** 7)
                )

                if (
                    game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0
                ) {
                    if (game.yellow_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.yellow_spice.div(2 * 10 ** 7).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(2 * 10 ** 7)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(2 * 10 ** 7)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(2 * 10 ** 7)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(2 * 10 ** 7)
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
                            .mul(2 * 10 ** 7)
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
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 7 ||
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
                        .mul(4 * 10 ** 8)
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
                        .mul(4 * 10 ** 8)
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
                        .mul(4 * 10 ** 8)
                )

                if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
                    if (game.green_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.green_spice.div(4 * 10 ** 8).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(4 * 10 ** 8)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(4 * 10 ** 8)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(4 * 10 ** 8)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(4 * 10 ** 8)
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
                            .mul(4 * 10 ** 8)
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
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 7 ||
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
                        .mul(8 * 10 ** 9)
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
                        .mul(8 * 10 ** 9)
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
                        .mul(8 * 10 ** 9)
                )

                if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
                    if (game.blue_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.blue_spice.div(8 * 10 ** 9).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(8 * 10 ** 9)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(8 * 10 ** 9)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(8 * 10 ** 9)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(8 * 10 ** 9)
                        )
                        game.blue_spice = Decimal.max(
                            game.blue_spice.sub(price),
                            0
                        )
                        game.blue_strengthener = n + 1
                        game.blue_strengthener_price = Decimal.pow(10000, n + 1)
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(8 * 10 ** 9)
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
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 7 ||
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
                        .mul(1.6 * 10 ** 11)
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
                        .mul(1.6 * 10 ** 11)
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
                        .mul(1.6 * 10 ** 11)
                )

                if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
                    if (game.pink_spice.cmp(price3) >= 0) {
                        n = Math.floor(
                            b +
                                (8 *
                                    Math.log(a) *
                                    game.pink_spice.div(1.6 * 10 ** 11).ln() +
                                    c) **
                                    0.5 /
                                    (2 * Math.log(a))
                        )
                        let price = Decimal.pow(10000, n)
                            .mul(Decimal.pow(a, ((n - 25) * (n - 24)) / 2))
                            .mul(1.6 * 10 ** 11)
                        price = price.add(
                            Decimal.pow(10000, n - 1)
                                .mul(Decimal.pow(a, ((n - 26) * (n - 25)) / 2))
                                .mul(1.6 * 10 ** 11)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 2)
                                .mul(Decimal.pow(a, ((n - 27) * (n - 26)) / 2))
                                .mul(1.6 * 10 ** 11)
                        )
                        price = price.add(
                            Decimal.pow(10000, n - 3)
                                .mul(Decimal.pow(a, ((n - 28) * (n - 27)) / 2))
                                .mul(1.6 * 10 ** 11)
                        )
                        game.pink_spice = Decimal.max(
                            game.pink_spice.sub(price),
                            new Decimal(0)
                        )
                        game.pink_strengthener = n + 1
                        game.pink_strengthener_price = Decimal.pow(10000, n + 1)
                            .mul(Decimal.pow(a, ((n - 24) * (n - 23)) / 2))
                            .mul(1.6 * 10 ** 11)
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
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6 ||
                        game.collapse_challenge === 7 ||
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
            break
        case "arcane":
            n = Math.floor(
                Math.log10(
                    1 - (game.ansuz * -7) / game.arcane_strengthener_price
                ) / Math.log10(8)
            )
            if (n > 0) {
                let price = Math.round(
                    (game.arcane_strengthener_price * (1 - 8 ** n)) / -7
                )
                game.ansuz = Math.max(game.ansuz - price, 0)
                game.arcane_strengthener_price *= 8 ** n
                game.arcane_strengthener += n

                if (
                    game.research_complete[13] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    game.free_enchantment =
                        game.arcane_enchantment / 10n +
                        BigInt(game.arcane_strengthener) * 200n
                    if (
                        game.research_complete[25] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        let collapse_free = BigInt(game.collapse) * 50n
                        if (game.collapse >= 100000)
                            collapse_free = BigInt(
                                Math.floor(
                                    2500000 *
                                        ((game.collapse - 87500) / 50000) **
                                            0.5 +
                                        3750000
                                )
                            )
                        if (game.collapse >= 31337500)
                            collapse_free = BigInt(game.collapse) + 34912500n
                        if (collapse_free > game.arcane_enchantment / 2n)
                            collapse_free = game.arcane_enchantment / 2n

                        game.free_enchantment += collapse_free
                    }
                }

                for (let i = 0; i < 3; i++) {
                    game.autods_budget[i] = Math.max(
                        game.autods_budget[i] - price,
                        0
                    )
                    if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.ansuz >= game.arcane_spice_price[i]) generators++
            }
            budget = Math.floor(game.ansuz / generators)
            for (let i = 5; i >= 0; i--) {
                let ansuz_budget = budget
                if (
                    game.arcane_spice_bought[i] === 0n &&
                    ansuz_budget >= game.arcane_spice_price[i]
                ) {
                    game.ansuz = Math.max(
                        game.ansuz - game.arcane_spice_price[i],
                        0
                    )
                    ansuz_budget = Math.max(
                        ansuz_budget - game.arcane_spice_price[i],
                        0
                    )
                    game.arcane_spice_price[i] *= 1.1
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(1)
                    game.arcane_spice_bought[i] += 1n
                }
                let m = BigInt(
                    Math.floor(
                        Math.log10(
                            1 -
                                (ansuz_budget * -0.1) /
                                    game.arcane_spice_price[i]
                        ) / Math.log10(1.1)
                    )
                )
                if (game.arcane_spice_bought[i] + m >= 3n)
                    m =
                        ((game.arcane_spice_bought[i] + m) / 3n) * 3n -
                        game.arcane_spice_bought[i]
                if (m > 0n) {
                    let price = Math.round(
                        (game.arcane_spice_price[i] *
                            (1 - 1.1 ** m.toString())) /
                            -0.1
                    )
                    game.ansuz = Math.max(game.ansuz - price, 0)
                    game.arcane_spice_price[i] *= 1.1 ** m.toString()
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                        m.toString()
                    )
                    game.arcane_spice_bought[i] += m

                    let arcane_bought = game.arcane_spice_bought[i] / 3n
                    game.arcane_spice_boost[i] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )

                    for (let i = 0; i < 3; i++) {
                        game.autods_budget[i] = Math.max(
                            game.autods_budget[i] - price,
                            0
                        )
                        if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                    }
                }
            }
            break
        case "arcane_half":
            let budget2 = game.ansuz / 2
            n = Math.floor(
                Math.log10(
                    1 - (budget2 * -7) / game.arcane_strengthener_price
                ) / Math.log10(8)
            )
            if (n > 0) {
                let price = Math.round(
                    (game.arcane_strengthener_price * (1 - 8 ** n)) / -7
                )
                game.ansuz = Math.max(game.ansuz - price, 0)
                budget2 = Math.max(budget2 - price, 0)
                game.arcane_strengthener_price *= 8 ** n
                game.arcane_strengthener += n

                if (
                    game.research_complete[13] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    game.free_enchantment =
                        game.arcane_enchantment / 10n +
                        BigInt(game.arcane_strengthener) * 200n
                    if (
                        game.research_complete[25] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        let collapse_free = BigInt(game.collapse) * 50n
                        if (game.collapse >= 100000)
                            collapse_free = BigInt(
                                Math.floor(
                                    2500000 *
                                        ((game.collapse - 87500) / 50000) **
                                            0.5 +
                                        3750000
                                )
                            )
                        if (game.collapse >= 31337500)
                            collapse_free = BigInt(game.collapse) + 34912500n
                        if (collapse_free > game.arcane_enchantment / 2n)
                            collapse_free = game.arcane_enchantment / 2n

                        game.free_enchantment += collapse_free
                    }
                }

                for (let i = 0; i < 3; i++) {
                    game.autods_budget[i] = Math.max(
                        game.autods_budget[i] - price,
                        0
                    )
                    if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (budget2 >= game.arcane_spice_price[i]) generators++
            }
            budget = Math.floor(budget2 / generators)
            for (let i = 5; i >= 0; i--) {
                let temp_budget = budget
                if (game.arcane_spice_bought[i] === 0n)
                    temp_budget = buy_gen("arcane", i, temp_budget)
                let m = BigInt(
                    Math.floor(
                        Math.log10(
                            1 -
                                (temp_budget * -0.1) /
                                    game.arcane_spice_price[i]
                        ) / Math.log10(1.1)
                    )
                )
                if (game.arcane_spice_bought[i] + m >= 3n)
                    m =
                        ((game.arcane_spice_bought[i] + m) / 3n) * 3n -
                        game.arcane_spice_bought[i]
                if (m > 0n) {
                    let price = Math.round(
                        (game.arcane_spice_price[i] *
                            (1 - 1.1 ** m.toString())) /
                            -0.1
                    )
                    game.ansuz = Math.max(game.ansuz - price, 0)
                    temp_budget = Math.max(temp_budget - price, 0)
                    game.arcane_spice_price[i] *= 1.1 ** m.toString()
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                        m.toString()
                    )
                    game.arcane_spice_bought[i] += m

                    let arcane_bought = game.arcane_spice_bought[i] / 3n
                    game.arcane_spice_boost[i] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )

                    for (let i = 0; i < 3; i++) {
                        game.autods_budget[i] = Math.max(
                            game.autods_budget[i] - price,
                            0
                        )
                        if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                    }
                }
            }
            break
        case "arcane_budget":
            n = Math.floor(
                Math.log10(
                    1 -
                        (game.autods_budget[2] * -7) /
                            game.arcane_strengthener_price
                ) / Math.log10(8)
            )
            if (n > 0) {
                let price = Math.round(
                    (game.arcane_strengthener_price * (1 - 8 ** n)) / -7
                )
                game.ansuz = Math.max(game.ansuz - price, 0)
                game.autods_budget[2] = Math.max(
                    game.autods_budget[2] - price,
                    0
                )
                game.arcane_strengthener_price *= 8 ** n
                game.arcane_strengthener += n

                if (
                    game.research_complete[13] >= 1 &&
                    game.collapse_challenge !== 12
                ) {
                    game.free_enchantment =
                        game.arcane_enchantment / 10n +
                        BigInt(game.arcane_strengthener) * 200n
                    if (
                        game.research_complete[25] >= 1 &&
                        game.collapse_challenge !== 12
                    ) {
                        let collapse_free = BigInt(game.collapse) * 50n
                        if (game.collapse >= 100000)
                            collapse_free = BigInt(
                                Math.floor(
                                    2500000 *
                                        ((game.collapse - 87500) / 50000) **
                                            0.5 +
                                        3750000
                                )
                            )
                        if (game.collapse >= 31337500)
                            collapse_free = BigInt(game.collapse) + 34912500n
                        if (collapse_free > game.arcane_enchantment / 2n)
                            collapse_free = game.arcane_enchantment / 2n

                        game.free_enchantment += collapse_free
                    }
                }
            }
            generators = 1
            for (let i = 1; i < 6; i++) {
                if (game.autods_budget[2] >= game.arcane_spice_price[i])
                    generators++
            }
            budget = Math.floor(game.autods_budget[2] / generators)
            for (let i = 5; i >= 0; i--) {
                let temp_budget = budget
                if (game.arcane_spice_bought[i] === 0n) {
                    let old_budget = temp_budget
                    temp_budget = buy_gen("arcane", i, temp_budget)
                    game.autods_budget[2] -= old_budget - temp_budget
                }
                let m = BigInt(
                    Math.floor(
                        Math.log10(
                            1 -
                                (temp_budget * -0.1) /
                                    game.arcane_spice_price[i]
                        ) / Math.log10(1.1)
                    )
                )
                if (game.arcane_spice_bought[i] >= 3n)
                    m =
                        ((game.arcane_spice_bought[i] + m) / 3n) * 3n -
                        game.arcane_spice_bought[i]
                if (m > 0n) {
                    let price = Math.round(
                        (game.arcane_spice_price[i] *
                            (1 - 1.1 ** m.toString())) /
                            -0.1
                    )
                    game.ansuz = Math.max(game.ansuz - price, 0)
                    temp_budget = Math.max(temp_budget - price, 0)
                    game.autods_budget[2] = Math.max(
                        game.autods_budget[2] - price,
                        0
                    )
                    game.arcane_spice_price[i] *= 1.1 ** m.toString()
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(
                        m.toString()
                    )
                    game.arcane_spice_bought[i] += m

                    let arcane_bought = game.arcane_spice_bought[i] / 3n
                    game.arcane_spice_boost[i] = Decimal.pow(
                        3,
                        arcane_bought.toString()
                    )
                }
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
                    "Mode: SPICE"
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
            if (game.autoup_toggle) {
                game.autoup_toggle = false
                document.getElementById("upgrade_auto_toggle").innerHTML =
                    "Auto: OFF"
                document.getElementById("upgrade_auto_toggle2").innerHTML =
                    "Auto: OFF"
                document.getElementById("upgrade_auto_toggle").className =
                    "spice_buy a_disabled"
                document.getElementById("upgrade_auto_toggle2").className =
                    "spice_buy a_disabled"
            } else {
                game.autoup_toggle = true
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
                    alert(
                        "Ascension confirmations must be off to turn on Ascension automation!"
                    )
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
            if (game.autods_toggle) {
                game.autods_toggle = false
                document.getElementById("distribute_auto_toggle").innerHTML =
                    "OFF"
                document.getElementById("distribute_auto_toggle").className =
                    "rune_button a_unlocked"
            } else {
                game.autods_toggle = true
                document.getElementById("distribute_auto_toggle").innerHTML =
                    "ON"
                document.getElementById("distribute_auto_toggle").className =
                    "rune_button a_active"
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
                    alert(
                        "Collapse confirmations must be off to turn on Collapse automation!"
                    )
                }
            }
            break
        case "collapse_mode":
            if (game.autoco_mode === 0) {
                game.autoco_mode = 1
                document.getElementById("collapse_auto_mode").innerHTML =
                    "Mode: TIME"
            } else if (game.autoco_mode === 1) {
                game.autoco_mode = 0
                document.getElementById("collapse_auto_mode").innerHTML =
                    "Mode: SPICE"
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
    }
}

//buying prestige upgrades
function buy_prestige_upgrade(id, max) {
    if (max) {
        while (
            game.rainbow_spice.cmp(prestige_upgrade.upgrades[id].price) >= 0 &&
            game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
        ) {
            game.rainbow_spice = Decimal.max(
                game.rainbow_spice.sub(prestige_upgrade.upgrades[id].price),
                0
            )
            game.prestige_bought[id]++

            if (game.prestige_bought[id] < prestige_upgrade.upgrades[id].max)
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
                                    Decimal.pow(2, game.prestige_bought[id] - 6)
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
                    case 20:
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(2, 8 + game.prestige_bought[id] * 8)
                            )
                        break
                }
        }
    } else {
        if (
            game.rainbow_spice.cmp(prestige_upgrade.upgrades[id].price) >= 0 &&
            game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
        ) {
            game.rainbow_spice = Decimal.max(
                game.rainbow_spice.sub(prestige_upgrade.upgrades[id].price),
                0
            )
            game.prestige_bought[id]++

            if (game.prestige_bought[id] < prestige_upgrade.upgrades[id].max)
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
                                    Decimal.pow(2, game.prestige_bought[id] - 6)
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
                    case 20:
                        prestige_upgrade.upgrades[id].price =
                            prestige_upgrade.upgrades[id].price.mul(
                                Decimal.pow(2, 8 + game.prestige_bought[id] * 8)
                            )
                        break
                }
        }
    }
}

//buying crystal infusions
function buy_infusion() {
    if (game.crystal_spice.cmp(game.crystal_infusion_price) >= 0) {
        game.crystal_spice = Decimal.max(
            game.crystal_spice.sub(game.crystal_infusion_price),
            0
        )
        game.crystal_infusion_price = game.crystal_infusion_price.mul(4)
        if (game.crystal_infusion >= 20) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(6)
        }
        if (game.crystal_infusion >= 50) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(8)
        }
        if (game.crystal_infusion >= 160) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(10)
        }
        if (game.crystal_infusion >= 22500) {
            game.crystal_infusion_price = game.crystal_infusion_price.mul(
                1.2 * 10 ** 9
            )
        }
        game.crystal_infusion += 1n

        if (game.crystal_spice.cmp(0) < 0) game.crystal_spice = new Decimal(0)
    }
}

//maxing crystal infusions
function max_infusion() {
    let n = 0n
    if (game.crystal_spice.cmp(game.crystal_infusion_price) >= 0) {
        if (game.crystal_infusion < 20n) {
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
            if (game.crystal_infusion + n >= 20n)
                n = 20n - game.crystal_infusion
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
        if (game.crystal_infusion < 50n) {
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
            if (game.crystal_infusion + n >= 50n)
                n = 50n - game.crystal_infusion
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
        if (game.crystal_infusion < 160n) {
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
            if (game.crystal_infusion + n >= 160n)
                n = 160n - game.crystal_infusion
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
        if (game.crystal_infusion < 22500n) {
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
            if (game.crystal_infusion + n >= 22500n)
                n = 22500n - game.crystal_infusion
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
                            .mul(-2.304 * 10 ** 12 + 1)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(2.304 * 10 ** 12)
            )
        )
        if (n > 0n) {
            let price = game.crystal_infusion_price
                .mul(
                    new Decimal(1).sub(
                        new Decimal(2.304 * 10 ** 12).pow(n.toString())
                    )
                )
                .div(-2.304 * 10 ** 12 + 1)
            game.crystal_spice = Decimal.max(game.crystal_spice.sub(price), 0)
            game.crystal_infusion_price = game.crystal_infusion_price.mul(
                new Decimal(2.304 * 10 ** 12).pow(n.toString())
            )
            game.crystal_infusion += n
        }

        if (game.crystal_spice.cmp(0) < 0) game.crystal_spice = new Decimal(0)
    }
}

//convert runes
function convert_rune(id, max, half) {
    if (game.ansuz >= 1) {
        if (max) {
            if (half) {
                game.rune[id] += Math.floor(game.ansuz / 2)
                game.ansuz = Math.max(
                    game.ansuz - Math.floor(game.ansuz / 2),
                    0
                )

                for (let i = 0; i < 3; i++) {
                    game.autods_budget[i] = Math.max(
                        game.autods_budget[i] - Math.floor(game.ansuz / 2),
                        0
                    )
                }
            } else {
                game.rune[id] += game.ansuz
                game.ansuz = 0

                game.autods_budget = [0, 0, 0]
            }
        } else {
            game.rune[id]++
            game.ansuz = Math.max(game.ansuz - 1, 0)

            for (let i = 0; i < 3; i++) {
                game.autods_budget[i] = Math.max(game.autods_budget[i] - 1, 0)
            }
        }
    }
}

//distribute runes
function distribute_runes(mode) {
    let amount = 0
    if (mode === "all") {
        if (game.ansuz >= 3) {
            amount = Math.floor(game.ansuz / 3)
        }
    }
    if (mode === "half") {
        if (game.ansuz >= 6) {
            amount = Math.floor(game.ansuz / 6)
        }
    }
    if (mode === "budget") {
        if (game.autods_budget[1] >= 3) {
            amount = Math.floor(game.autods_budget[1] / 3)
        }
    }

    game.ansuz = Math.max(game.ansuz - amount * 3, 0)
    for (let i = 0; i < 3; i++) {
        game.rune[i] += amount
    }

    if (mode !== "budget") {
        for (let i = 0; i < 3; i++) {
            game.autods_budget[i] = Math.max(
                game.autods_budget[i] - amount * 3,
                0
            )
            if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
        }
    } else {
        game.autods_budget[1] = Math.max(game.autods_budget[1] - amount * 3, 0)
    }
}

//recall runes
function recall_runes(mode) {
    if (mode === 1) {
        let recall_ready = false
        if (game.ascend_confirm) {
            if (
                confirm(
                    "Are you sure you want to recall all converted runes? This will reset your rune power!"
                )
            )
                recall_ready = true
        } else {
            recall_ready = true
        }

        if (recall_ready) {
            for (let i = 0; i < 3; i++) {
                game.ansuz += game.rune[i]
                game.rune[i] = 0
                game.rune_power[i] = 0
                game.rune_boost[i] = new Decimal(1)
            }
        }
    } else if (mode === 2) {
        let recall_ready = false
        if (game.ascend_confirm) {
            if (
                confirm(
                    "Are you sure you want to recall all runes spent on upgrades? You will Ascend!"
                )
            )
                recall_ready = true
        } else {
            recall_ready = true
        }

        if (recall_ready) {
            for (const u of ascension_upgrade.upgrades) {
                if (game.collapse_challenge === 10) {
                    if (game.ascend_bought[u.id]) {
                        game.ascend_bought[u.id] = false
                        game.ansuz += Math.ceil(u.price ** 0.5)
                    }
                } else {
                    if (game.ascend_bought[u.id]) {
                        game.ascend_bought[u.id] = false
                        game.ansuz += u.price
                    }
                }
            }

            ascend(true)
        }
    } else if (mode === 3) {
        let recall_ready = false
        if (game.ascend_confirm) {
            if (
                confirm(
                    "Are you sure you want to recall all runes spent on arcane spice? You will Ascend!"
                )
            )
                recall_ready = true
        } else {
            recall_ready = true
        }

        if (recall_ready) {
            for (let i = 0; i < 6; i++) {
                if (game.arcane_spice_bought[i] > 0n) {
                    game.ansuz += Math.floor(
                        (spice_gen.generators[36 + i].base_price *
                            (1 -
                                1.1 **
                                    game.arcane_spice_bought[i].toString())) /
                            -0.1
                    )
                    game.arcane_spice_bought[i] = 0n
                    game.arcane_spice_price[i] =
                        spice_gen.generators[36 + i].base_price
                    game.arcane_spice_boost[i] = new Decimal(1)
                }
            }

            if (game.arcane_strengthener > 0) {
                game.ansuz +=
                    (5000000 * (1 - 8 ** game.arcane_strengthener)) / -7
                game.arcane_strengthener = 0
                game.arcane_strengthener_price = 5000000
            }

            ascend(true)
        }
    } else if (mode === 4) {
        let recall_ready = false
        if (game.ascend_confirm) {
            if (
                confirm(
                    "Are you sure you want to recall runes from ALL sources? You will Ascend!"
                )
            )
                recall_ready = true
        } else {
            recall_ready = true
        }

        if (recall_ready) {
            for (let i = 0; i < 3; i++) {
                game.ansuz += game.rune[i]
                game.rune[i] = 0
            }

            for (const u of ascension_upgrade.upgrades) {
                if (game.collapse_challenge === 10) {
                    if (game.ascend_bought[u.id]) {
                        game.ascend_bought[u.id] = false
                        game.ansuz += Math.ceil(u.price ** 0.5)
                    }
                } else {
                    if (game.ascend_bought[u.id]) {
                        game.ascend_bought[u.id] = false
                        game.ansuz += u.price
                    }
                }
            }

            for (let i = 0; i < 6; i++) {
                if (game.arcane_spice_bought[i] > 0n) {
                    game.ansuz += Math.floor(
                        (spice_gen.generators[36 + i].base_price *
                            (1 -
                                1.1 **
                                    game.arcane_spice_bought[i].toString())) /
                            -0.1
                    )
                    game.arcane_spice_bought[i] = 0n
                    game.arcane_spice_price[i] =
                        spice_gen.generators[36 + i].base_price
                    game.arcane_spice_boost[i] = new Decimal(1)
                }
            }

            if (game.arcane_strengthener > 0) {
                game.ansuz +=
                    (5000000 * (1 - 8 ** game.arcane_strengthener)) / -7
                game.arcane_strengthener = 0
                game.arcane_strengthener_price = 5000000
            }

            ascend(true)
        }
    }
}

//buying ascension upgrades
function buy_ascension_upgrade(id, budget) {
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

    if (!game.ascend_bought[id] && condition1 && condition2) {
        if (game.collapse_challenge === 10) {
            if (budget) {
                if (
                    game.autods_budget[0] >=
                    Math.ceil(ascension_upgrade.upgrades[id].price ** 0.5)
                ) {
                    game.ansuz = Math.max(
                        game.ansuz -
                            Math.ceil(
                                ascension_upgrade.upgrades[id].price ** 0.5
                            ),
                        0
                    )
                    game.autods_budget[0] = Math.max(
                        game.autods_budget[0] -
                            Math.ceil(
                                ascension_upgrade.upgrades[id].price ** 0.5
                            ),
                        0
                    )
                    game.ascend_bought[id] = true
                }
            } else {
                if (
                    game.ansuz >=
                    Math.ceil(ascension_upgrade.upgrades[id].price ** 0.5)
                ) {
                    game.ansuz = Math.max(
                        game.ansuz -
                            Math.ceil(
                                ascension_upgrade.upgrades[id].price ** 0.5
                            ),
                        0
                    )
                    game.ascend_bought[id] = true

                    for (let i = 0; i < 3; i++) {
                        game.autods_budget[i] = Math.max(
                            game.autods_budget[i] -
                                Math.ceil(
                                    ascension_upgrade.upgrades[id].price ** 0.5
                                ),
                            0
                        )
                        if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                    }
                }
            }
        } else {
            if (budget) {
                if (
                    game.autods_budget[0] >=
                    ascension_upgrade.upgrades[id].price
                ) {
                    game.ansuz = Math.max(
                        game.ansuz - ascension_upgrade.upgrades[id].price,
                        0
                    )
                    game.autods_budget[0] = Math.max(
                        game.autods_budget[0] -
                            ascension_upgrade.upgrades[id].price,
                        0
                    )
                    game.ascend_bought[id] = true
                }
            } else {
                if (game.ansuz >= ascension_upgrade.upgrades[id].price) {
                    game.ansuz = Math.max(
                        game.ansuz - ascension_upgrade.upgrades[id].price,
                        0
                    )
                    game.ascend_bought[id] = true
                    if (id === 16 && game.collapse === 0) {
                        confirmations("challenge")
                        confirmations("challenge")
                    }

                    for (let i = 0; i < 3; i++) {
                        game.autods_budget[i] = Math.max(
                            game.autods_budget[i] -
                                ascension_upgrade.upgrades[id].price,
                            0
                        )
                        if (game.autods_budget[i] < 0) game.autods_budget[i] = 0
                    }
                }
            }
        }

        if (game.research_complete[8] >= 1) {
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
function enter_ascension_challenge(id) {
    if (game.ascend_challenge === 0 && !game.ascend_complete[id - 1]) {
        let challenge_ready = false
        if (!game.challenge_confirm) challenge_ready = true
        else {
            if (
                confirm(
                    "Are you sure you want to enter Challenge " +
                        format_num(id, 0) +
                        "? You will Ascend!"
                )
            ) {
                challenge_ready = true
            }
        }

        if (challenge_ready) {
            ascend(true)
            game.ascend_challenge = id

            if (game.ascend_challenge === 5) game.ascend_challenge_timer = 0
        }
    } else {
        if (game.ascend_challenge === id) {
            ascend()
        } else {
            alert(
                "You cannot enter an Ascension Challenge if you are already in one!"
            )
        }
    }
}

//exiting an ascension challenge
function exit_ascension_challenge() {
    if (game.ascend_challenge !== 0) {
        game.ascend_challenge = 0
        ascend(true)
    }
}

//buying arcane enchantments
function buy_enchantment() {
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        game.arcane_spice = Decimal.max(
            game.arcane_spice.sub(game.arcane_enchantment_price),
            0
        )
        game.arcane_enchantment_price = game.arcane_enchantment_price.mul(4)
        if (
            game.arcane_enchantment >= 25 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(5)
        if (
            game.arcane_enchantment >= 125 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(6)
        if (
            game.arcane_enchantment >= 5000 &&
            game.ascend_challenge !== 5 &&
            game.collapse_challenge !== 7
        )
            game.arcane_enchantment_price =
                game.arcane_enchantment_price.mul(665280)

        game.arcane_enchantment += 1n
        game.ascend_challenge_timer = 0

        if (game.research_complete[11] >= 1 && game.collapse_challenge !== 12) {
            game.free_enchantment = game.arcane_enchantment / 10n
            if (
                game.research_complete[13] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment += BigInt(game.arcane_strengthener) * 200n
            if (
                game.research_complete[25] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 31337500)
                    collapse_free = BigInt(game.collapse) + 34912500n
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
            if (game.arcane_enchantment < 25n) {
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
                if (game.arcane_enchantment + n >= 25n)
                    n = 25n - game.arcane_enchantment
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
            if (game.arcane_enchantment < 125n) {
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
                if (game.arcane_enchantment + n >= 125n)
                    n = 125n - game.arcane_enchantment
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
            if (game.arcane_enchantment < 5000n) {
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
                if (game.arcane_enchantment + n >= 5000n)
                    n = 5000n - game.arcane_enchantment
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
            n = BigInt(
                Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-79833599)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(79833600)
                )
            )
            if (n > 0n) {
                let price = game.arcane_enchantment_price
                    .mul(
                        new Decimal(1).sub(
                            new Decimal(79833600).pow(n.toString())
                        )
                    )
                    .div(-779833599)
                game.arcane_spice = Decimal.max(game.arcane_spice.sub(price), 0)
                game.arcane_enchantment_price =
                    game.arcane_enchantment_price.mul(
                        new Decimal(79833600).pow(n.toString())
                    )
                game.arcane_enchantment += n
                game.ascend_challenge_timer = 0
            }
        }

        if (game.research_complete[11] >= 1 && game.collapse_challenge !== 12) {
            game.free_enchantment = game.arcane_enchantment / 10n
            if (
                game.research_complete[13] >= 1 &&
                game.collapse_challenge !== 12
            )
                game.free_enchantment += BigInt(game.arcane_strengthener) * 200n
            if (
                game.research_complete[25] >= 1 &&
                game.collapse_challenge !== 12
            ) {
                let collapse_free = BigInt(game.collapse) * 50n
                if (game.collapse >= 100000)
                    collapse_free = BigInt(
                        Math.floor(
                            2500000 * ((game.collapse - 87500) / 50000) ** 0.5 +
                                3750000
                        )
                    )
                if (game.collapse >= 31337500)
                    collapse_free = BigInt(game.collapse) + 34912500n
                if (collapse_free > game.arcane_enchantment / 2n)
                    collapse_free = game.arcane_enchantment / 2n

                game.free_enchantment += collapse_free
            }
        }

        if (game.arcane_spice.cmp(0) < 0) game.arcane_spice = new Decimal(0)
    }
}

//activating the spice collider
function activate_collider() {
    let can_collide = false

    let red_amount = Decimal.pow(
        10,
        (game.antitotal_spice[1].log(10) / (4.2 * 10 ** 11)) ** 0.5
    )
    let yellow_amount = Decimal.pow(
        10,
        (game.antitotal_spice[2].log(10) / (1.75 * 10 ** 12)) ** 0.5
    )
    let green_amount = Decimal.pow(
        10,
        (game.antitotal_spice[3].log(10) / (4.5 * 10 ** 12)) ** 0.5
    )
    let blue_amount = Decimal.pow(
        10,
        (game.antitotal_spice[4].log(10) / (3.5 * 10 ** 13)) ** 0.5
    )
    let pink_amount = Decimal.pow(
        10,
        (game.antitotal_spice[5].log(10) / (3.75 * 10 ** 13)) ** 0.5
    )
    let rainbow_amount = (game.antitotal_spice[6].log(10) - 11300000) / 900000
    if (rainbow_amount < 0) rainbow_amount = 0
    if (rainbow_amount > 24) rainbow_amount = 24
    let atomic_amount =
        (game.spent_atomic_spice[6]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .log(10) -
            31320) /
        1620
    if (atomic_amount < 0) atomic_amount = 0
    if (atomic_amount > 24) atomic_amount = 24

    let pending_amount = new Decimal(0)

    switch (game.collider_tab) {
        case 0:
            if (
                game.atomic_spice
                    .mul(game.atomic_portion)
                    .pow(game.atomic_efficiency)
                    .cmp(1) >= 0
            )
                can_collide = true
            break
        case 1:
            pending_amount = game.spent_atomic_spice[0]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 132)
            if (pending_amount.cmp(Decimal.pow(10, 420)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 420) ** 0.8 * 420
                )
            if (pending_amount.sub(game.antispice[0]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 2:
            pending_amount = game.spent_atomic_spice[1]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 320)
                .mul(red_amount)
            if (pending_amount.cmp(Decimal.pow(10, 336)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 336) ** 0.8 * 336
                )
            if (pending_amount.sub(game.antispice[1]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 3:
            pending_amount = game.spent_atomic_spice[2]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 1000)
                .mul(yellow_amount)
            if (pending_amount.cmp(Decimal.pow(10, 116)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 116) ** 0.8 * 116
                )
            if (pending_amount.sub(game.antispice[2]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 4:
            pending_amount = game.spent_atomic_spice[3]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 2575)
                .mul(green_amount)
            if (pending_amount.cmp(Decimal.pow(10, 48)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 48) ** 0.8 * 48
                )
            if (pending_amount.sub(game.antispice[3]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 5:
            pending_amount = game.spent_atomic_spice[4]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 4850)
                .mul(blue_amount)
            if (pending_amount.cmp(Decimal.pow(10, 19)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 19) ** 0.8 * 19
                )
            if (pending_amount.sub(game.antispice[4]).floor().cmp(1) >= 0)
                can_collide = true
            break
        case 6:
            pending_amount = game.spent_atomic_spice[5]
                .add(game.atomic_spice.mul(game.atomic_portion))
                .pow(game.atomic_efficiency / 16500)
                .mul(pink_amount)
            if (pending_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                pending_amount = Decimal.pow(
                    10,
                    (pending_amount.log(10) / 7.5) ** 0.8 * 7.5
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
                            .pow(game.atomic_efficiency)
                            .log(10000)
                    )
                    if (p > 30) p = 30
                    break
                case 1:
                    pending_amount = game.spent_atomic_spice[0]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 132)
                    if (pending_amount.cmp(Decimal.pow(10, 420)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 420) ** 0.8 * 420
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 2:
                    pending_amount = game.spent_atomic_spice[1]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 320)
                        .mul(red_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 336)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 336) ** 0.8 * 336
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 3:
                    pending_amount = game.spent_atomic_spice[2]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 1000)
                        .mul(yellow_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 116)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 116) ** 0.8 * 116
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 4:
                    pending_amount = game.spent_atomic_spice[3]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 2575)
                        .mul(green_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 48)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 48) ** 0.8 * 48
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 5:
                    pending_amount = game.spent_atomic_spice[4]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 4850)
                        .mul(blue_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 19)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 19) ** 0.8 * 19
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 6:
                    pending_amount = game.spent_atomic_spice[5]
                        .add(game.atomic_spice.mul(game.atomic_portion))
                        .pow(game.atomic_efficiency / 16500)
                        .mul(pink_amount)
                    if (pending_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                        pending_amount = Decimal.pow(
                            10,
                            (pending_amount.log(10) / 7.5) ** 0.8 * 7.5
                        )
                    p += Math.floor(pending_amount.floor().log(100))
                    if (p > 30) p = 30
                    break
                case 7:
                    p += Math.floor(
                        ((game.spent_atomic_spice[6]
                            .add(game.atomic_spice.mul(game.atomic_portion))
                            .log(10) -
                            31320) /
                            1620 +
                            rainbow_amount) /
                            2
                    )
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
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    game.atomic_spice
                        .mul(game.atomic_portion)
                        .pow(game.atomic_efficiency)
                        .floor()
                )
                game.atomic_spice = game.atomic_spice.mul(
                    1 - game.atomic_portion
                )
            } else if (game.collider_tab === 1) {
                game.spent_atomic_spice[0] = game.spent_atomic_spice[0].add(
                    game.atomic_spice.mul(game.atomic_portion)
                )
                let amount = game.spent_atomic_spice[0].pow(
                    game.atomic_efficiency / 132
                )
                if (amount.cmp(Decimal.pow(10, 420)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 420) ** 0.8 * 420
                    )
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
                    .pow(game.atomic_efficiency / 320)
                    .mul(red_amount)
                if (amount.cmp(Decimal.pow(10, 336)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 336) ** 0.8 * 336
                    )
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
                    .pow(game.atomic_efficiency / 1000)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 116)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 116) ** 0.8 * 116
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
                    .pow(game.atomic_efficiency / 2575)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 48)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 48) ** 0.8 * 48)
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
                    .pow(game.atomic_efficiency / 4850)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 19)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 19) ** 0.8 * 19)
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
                    .pow(game.atomic_efficiency / 16500)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 7.5) ** 0.8 * 7.5
                    )
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
                    (game.spent_atomic_spice[6].log(10) - 31320) / 1620
                if (atomic_amount < 0) atomic_amount = 0
                if (atomic_amount > 24) atomic_amount = 24

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
        (game.antitotal_spice[1].log(10) / (4.2 * 10 ** 11)) ** 0.5
    )
    let yellow_amount = Decimal.pow(
        10,
        (game.antitotal_spice[2].log(10) / (1.75 * 10 ** 12)) ** 0.5
    )
    let green_amount = Decimal.pow(
        10,
        (game.antitotal_spice[3].log(10) / (4.5 * 10 ** 12)) ** 0.5
    )
    let blue_amount = Decimal.pow(
        10,
        (game.antitotal_spice[4].log(10) / (3.5 * 10 ** 13)) ** 0.5
    )
    let pink_amount = Decimal.pow(
        10,
        (game.antitotal_spice[5].log(10) / (3.75 * 10 ** 13)) ** 0.5
    )
    let rainbow_amount = (game.antitotal_spice[6].log(10) - 11300000) / 900000
    if (rainbow_amount < 0) rainbow_amount = 0
    if (rainbow_amount > 24) rainbow_amount = 24
    let atomic_amount2 =
        (game.spent_atomic_spice[6]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .log(10) -
            31320) /
        1620
    if (atomic_amount2 < 0) atomic_amount2 = 0
    if (atomic_amount2 > 24) atomic_amount2 = 24

    let pending_amount = new Decimal(0)

    if (
        game.atomic_spice
            .mul(game.atomic_portion)
            .pow(game.atomic_efficiency)
            .cmp(game.total_unstable_spice) >= 0
    )
        can_collide = true

    if (game.research_complete[19] >= 1) {
        pending_amount = game.spent_atomic_spice[0]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 132)
        if (pending_amount.cmp(Decimal.pow(10, 420)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 420) ** 0.8 * 420
            )
        if (pending_amount.sub(game.antispice[0]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[1] = true
        }
    }

    if (game.research_complete[21] >= 1) {
        pending_amount = game.spent_atomic_spice[1]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 320)
            .mul(red_amount)
        if (pending_amount.cmp(Decimal.pow(10, 336)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 336) ** 0.8 * 336
            )
        if (pending_amount.sub(game.antispice[1]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[2] = true
        }
    }

    if (game.research_complete[24] >= 1) {
        pending_amount = game.spent_atomic_spice[2]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 1000)
            .mul(yellow_amount)
        if (pending_amount.cmp(Decimal.pow(10, 116)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 116) ** 0.8 * 116
            )
        if (pending_amount.sub(game.antispice[2]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[3] = true
        }
    }

    if (game.research_complete[27] >= 1) {
        pending_amount = game.spent_atomic_spice[3]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 2575)
            .mul(green_amount)
        if (pending_amount.cmp(Decimal.pow(10, 48)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 48) ** 0.8 * 48
            )
        if (pending_amount.sub(game.antispice[3]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[4] = true
        }
    }

    if (game.research_complete[30] >= 1) {
        pending_amount = game.spent_atomic_spice[4]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 4850)
            .mul(blue_amount)
        if (pending_amount.cmp(Decimal.pow(10, 19)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 19) ** 0.8 * 19
            )
        if (pending_amount.sub(game.antispice[4]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[5] = true
        }
    }

    if (game.research_complete[33] >= 1) {
        pending_amount = game.spent_atomic_spice[5]
            .add(game.atomic_spice.mul(game.atomic_portion))
            .pow(game.atomic_efficiency / 16500)
            .mul(pink_amount)
        if (pending_amount.cmp(Decimal.pow(10, 7.5)) >= 0)
            pending_amount = Decimal.pow(
                10,
                (pending_amount.log(10) / 7.5) ** 0.8 * 7.5
            )
        if (pending_amount.sub(game.antispice[5]).floor().cmp(1) >= 0) {
            can_collide = true
            available_spice[6] = true
        }
    }

    if (game.research_complete[37] >= 1) {
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

            let unstable_gain = atomic_amount.pow(game.atomic_efficiency)
            let basic_gain = game.spent_atomic_spice[0]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 132)
                .floor()
            if (basic_gain.cmp(Decimal.pow(10, 420)) >= 0)
                basic_gain = Decimal.pow(
                    10,
                    (basic_gain.log(10) / 420) ** 0.8 * 420
                )
            if (basic_gain.cmp(game.antispice[0]) === 1) highest_spice = 1
            let red_gain = game.spent_atomic_spice[1]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 320)
                .mul(red_amount)
                .floor()
            if (red_gain.cmp(Decimal.pow(10, 336)) >= 0)
                red_gain = Decimal.pow(
                    10,
                    (red_gain.log(10) / 336) ** 0.8 * 336
                )
            if (red_gain.cmp(game.antispice[1]) === 1) highest_spice = 2
            let yellow_gain = game.spent_atomic_spice[2]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 1000)
                .mul(yellow_amount)
                .floor()
            if (yellow_gain.cmp(Decimal.pow(10, 116)) >= 0)
                yellow_gain = Decimal.pow(
                    10,
                    (yellow_gain.log(10) / 116) ** 0.8 * 116
                )
            if (yellow_gain.cmp(game.antispice[2]) === 1) highest_spice = 3
            let green_gain = game.spent_atomic_spice[3]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 2575)
                .mul(green_amount)
                .floor()
            if (green_gain.cmp(Decimal.pow(10, 48)) >= 0)
                green_gain = Decimal.pow(
                    10,
                    (green_gain.log(10) / 48) ** 0.8 * 48
                )
            if (green_gain.cmp(game.antispice[3]) === 1) highest_spice = 4
            let blue_gain = game.spent_atomic_spice[4]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 4850)
                .mul(blue_amount)
                .floor()
            if (blue_gain.cmp(Decimal.pow(10, 19)) >= 0)
                blue_gain = Decimal.pow(
                    10,
                    (blue_gain.log(10) / 19) ** 0.8 * 19
                )
            if (blue_gain.cmp(game.antispice[4]) === 1) highest_spice = 5
            let pink_gain = game.spent_atomic_spice[5]
                .add(atomic_amount)
                .pow(game.atomic_efficiency / 16500)
                .mul(pink_amount)
                .floor()
            if (pink_gain.cmp(Decimal.pow(10, 7.5)) >= 0)
                pink_gain = Decimal.pow(
                    10,
                    (pink_gain.log(10) / 7.5) ** 0.8 * 7.5
                )
            if (pink_gain.cmp(game.antispice[5]) === 1) highest_spice = 6
            let rainbow_gain = Math.floor(rainbow_amount + atomic_amount2)
            if (rainbow_gain > game.total_rainbow_antispice) highest_spice = 7

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
                    atomic_amount.pow(game.atomic_efficiency).floor()
                )
                game.unstable_spice = game.unstable_spice.add(
                    atomic_amount.pow(game.atomic_efficiency).floor()
                )
            }

            if (game.research_complete[19] >= 1 && available_spice[1]) {
                game.spent_atomic_spice[0] =
                    game.spent_atomic_spice[0].add(atomic_amount)
                let amount = game.spent_atomic_spice[0].pow(
                    game.atomic_efficiency / 132
                )
                if (amount.cmp(Decimal.pow(10, 420)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 420) ** 0.8 * 420
                    )
                if (amount.floor().cmp(game.antispice[0]) >= 0)
                    game.antispice[0] = amount.floor()
            }

            if (game.research_complete[21] >= 1 && available_spice[2]) {
                game.spent_atomic_spice[1] =
                    game.spent_atomic_spice[1].add(atomic_amount)
                let amount = game.spent_atomic_spice[1]
                    .pow(game.atomic_efficiency / 320)
                    .mul(red_amount)
                if (amount.cmp(Decimal.pow(10, 336)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 336) ** 0.8 * 336
                    )
                if (amount.floor().cmp(game.antispice[1]) >= 0)
                    game.antispice[1] = amount.floor()
            }

            if (game.research_complete[24] >= 1 && available_spice[3]) {
                game.spent_atomic_spice[2] =
                    game.spent_atomic_spice[2].add(atomic_amount)
                let amount = game.spent_atomic_spice[2]
                    .pow(game.atomic_efficiency / 1000)
                    .mul(yellow_amount)
                if (amount.cmp(Decimal.pow(10, 116)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 116) ** 0.8 * 116
                    )
                if (amount.floor().cmp(game.antispice[2]) >= 0)
                    game.antispice[2] = amount.floor()
            }

            if (game.research_complete[27] >= 1 && available_spice[4]) {
                game.spent_atomic_spice[3] =
                    game.spent_atomic_spice[3].add(atomic_amount)
                let amount = game.spent_atomic_spice[3]
                    .pow(game.atomic_efficiency / 2575)
                    .mul(green_amount)
                if (amount.cmp(Decimal.pow(10, 48)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 48) ** 0.8 * 48)
                if (amount.floor().cmp(game.antispice[3]) >= 0)
                    game.antispice[3] = amount.floor()
            }

            if (game.research_complete[30] >= 1 && available_spice[5]) {
                game.spent_atomic_spice[4] =
                    game.spent_atomic_spice[4].add(atomic_amount)
                let amount = game.spent_atomic_spice[4]
                    .pow(game.atomic_efficiency / 4850)
                    .mul(blue_amount)
                if (amount.cmp(Decimal.pow(10, 19)) >= 0)
                    amount = Decimal.pow(10, (amount.log(10) / 19) ** 0.8 * 19)
                if (amount.floor().cmp(game.antispice[4]) >= 0)
                    game.antispice[4] = amount.floor()
            }

            if (game.research_complete[33] >= 1 && available_spice[6]) {
                game.spent_atomic_spice[5] =
                    game.spent_atomic_spice[5].add(atomic_amount)
                let amount = game.spent_atomic_spice[5]
                    .pow(game.atomic_efficiency / 16500)
                    .mul(pink_amount)
                if (amount.cmp(Decimal.pow(10, 7.5)) >= 0)
                    amount = Decimal.pow(
                        10,
                        (amount.log(10) / 7.5) ** 0.8 * 7.5
                    )
                if (amount.floor().cmp(game.antispice[5]) >= 0)
                    game.antispice[5] = amount.floor()
            }

            if (game.research_complete[37] >= 1 && available_spice[7]) {
                game.spent_atomic_spice[6] =
                    game.spent_atomic_spice[6].add(atomic_amount)

                atomic_amount2 =
                    (game.spent_atomic_spice[6].log(10) - 31320) / 1620
                if (atomic_amount2 < 0) atomic_amount2 = 0
                if (atomic_amount2 > 24) atomic_amount2 = 24

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
            if (game.research_view === 1) {
                if (game.research_complete[0] < 40) {
                    game.research_pause = false
                    game.research_select = game.research_view
                }
            } else {
                game.research_pause = false
                game.research_select = game.research_view
            }
        }
    }
}

//view research upgrade
function research_view(id) {
    game.research_view = id
}

//upgrading research speed
function research_upgrade() {
    if (
        game.atomic_spice.cmp(
            Decimal.pow(
                game.data_boosts + Math.PI / 2,
                game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
            )
                .mul(16384)
                .round()
        ) >= 0
    ) {
        game.atomic_spice = Decimal.max(
            game.atomic_spice.sub(
                Decimal.pow(
                    game.data_boosts + Math.PI / 2,
                    game.data_boosts ** ((game.data_boosts + 1) ** 0.09)
                )
                    .mul(16384)
                    .round()
            ),
            0
        )
        game.data_boosts++
    }
}

//entering a collapse challenge
function enter_collapse_challenge(id) {
    if (game.collapse_challenge === 0) {
        let challenge_ready = false
        if (!game.challenge_confirm) challenge_ready = true
        else {
            if (
                confirm(
                    "Are you sure you want to enter Challenge " +
                        format_num(id, 0) +
                        "? You will Collapse!"
                )
            ) {
                challenge_ready = true
            }
        }

        if (challenge_ready) {
            collapse(true)
            game.collapse_challenge = id
            game.pending_completions = 0

            if (game.collapse_challenge === 7) game.ascend_challenge_timer = 0
            if (game.collapse_challenge === 9) game.gamespeed = 1 / 99999
        }
    } else {
        if (game.collapse_challenge === id) {
            collapse()
        } else {
            alert(
                "You cannot enter a Collapse Challenge if you are already in one!"
            )
        }
    }
}

//exiting a collapse challenge
function exit_collapse_challenge() {
    if (game.collapse_challenge !== 0) {
        game.collapse_challenge = 0
        collapse(true)
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

    if (!game.antispice_bought[id] && game.antispice[6] >= price && id !== 8) {
        game.antispice[6] = Math.max(game.antispice[6] - price, 0)
        game.antispice_bought[id] = true
        game.antispice_order[id] = total_bought + 1
    }
}

//refunding antispice perks
function refund_antispice_perks() {
    if (
        game.antispice[6] < game.total_rainbow_antispice &&
        !game.antispice_bought[8]
    ) {
        if (
            confirm(
                "Are you sure you want to refund all antispice perks? You will Collapse!"
            )
        ) {
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
    }
}
