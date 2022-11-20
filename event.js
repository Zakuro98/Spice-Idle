//purchasing spice generators
function buy_gen(color, id, budget) {
    switch (color) {
        case "red":
            if (game.red_spice.cmp(game.red_spice_price[id]) >= 0) {
                game.red_spice = game.red_spice.sub(game.red_spice_price[id])
                game.red_spice_price[id] = game.red_spice_price[id].mul(1.2)
                game.red_spice_gen[id] = game.red_spice_gen[id].add(1)
                game.red_spice_bought[id] += 1

                game.red_spice_boost[id] = new Decimal(
                    Math.floor(game.red_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.red_spice_boost[id] = new Decimal(
                        Math.floor(game.red_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "yellow":
            if (game.yellow_spice.cmp(game.yellow_spice_price[id]) >= 0) {
                game.yellow_spice = game.yellow_spice.sub(
                    game.yellow_spice_price[id]
                )
                game.yellow_spice_price[id] =
                    game.yellow_spice_price[id].mul(1.3)
                game.yellow_spice_gen[id] = game.yellow_spice_gen[id].add(1)
                game.yellow_spice_bought[id] += 1

                game.yellow_spice_boost[id] = new Decimal(
                    Math.floor(game.yellow_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.yellow_spice_boost[id] = new Decimal(
                        Math.floor(game.yellow_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "green":
            if (game.green_spice.cmp(game.green_spice_price[id]) >= 0) {
                game.green_spice = game.green_spice.sub(
                    game.green_spice_price[id]
                )
                game.green_spice_price[id] = game.green_spice_price[id].mul(1.4)
                game.green_spice_gen[id] = game.green_spice_gen[id].add(1)
                game.green_spice_bought[id] += 1

                game.green_spice_boost[id] = new Decimal(
                    Math.floor(game.green_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.green_spice_boost[id] = new Decimal(
                        Math.floor(game.green_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "blue":
            if (game.blue_spice.cmp(game.blue_spice_price[id]) >= 0) {
                game.blue_spice = game.blue_spice.sub(game.blue_spice_price[id])
                game.blue_spice_price[id] = game.blue_spice_price[id].mul(1.5)
                game.blue_spice_gen[id] = game.blue_spice_gen[id].add(1)
                game.blue_spice_bought[id] += 1

                game.blue_spice_boost[id] = new Decimal(
                    Math.floor(game.blue_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.blue_spice_boost[id] = new Decimal(
                        Math.floor(game.blue_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "pink":
            if (game.pink_spice.cmp(game.pink_spice_price[id]) >= 0) {
                game.pink_spice = game.pink_spice.sub(game.pink_spice_price[id])
                game.pink_spice_price[id] = game.pink_spice_price[id].mul(1.6)
                game.pink_spice_gen[id] = game.pink_spice_gen[id].add(1)
                game.pink_spice_bought[id] += 1

                game.pink_spice_boost[id] = new Decimal(
                    Math.floor(game.pink_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.pink_spice_boost[id] = new Decimal(
                        Math.floor(game.pink_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "crystal":
            if (game.rainbow_spice.cmp(game.crystal_spice_price[id]) >= 0) {
                game.rainbow_spice = game.rainbow_spice.sub(
                    game.crystal_spice_price[id]
                )
                game.crystal_spice_price[id] =
                    game.crystal_spice_price[id].mul(2)
                game.crystal_spice_gen[id] = game.crystal_spice_gen[id].add(1)
                game.crystal_spice_bought[id] += 1

                game.crystal_spice_boost[id] = Decimal.pow(
                    2,
                    Math.floor(game.crystal_spice_bought[id] / 5)
                )
            }
            break
        case "arcane":
            if (budget !== undefined) {
                if (budget >= Math.round(game.arcane_spice_price[id])) {
                    game.ansuz -= Math.round(game.arcane_spice_price[id])
                    budget -= Math.round(game.arcane_spice_price[id])
                    game.arcane_spice_price[id] *= 1.1
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(1)
                    game.arcane_spice_bought[id] += 1

                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[id] / 3)
                    )

                    return budget
                }
            } else {
                if (game.ansuz >= Math.round(game.arcane_spice_price[id])) {
                    game.ansuz -= Math.round(game.arcane_spice_price[id])
                    game.arcane_spice_price[id] *= 1.1
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(1)
                    game.arcane_spice_bought[id] += 1

                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[id] / 3)
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
            n =
                Math.floor(game.red_spice_bought[id] / 10) * 10 +
                10 -
                game.red_spice_bought[id]

            price = game.red_spice_price[id].mul(1 - 1.2 ** n).div(-0.2)

            if (game.red_spice.cmp(price) >= 0) {
                game.red_spice = game.red_spice.sub(price)
                game.red_spice_price[id] = game.red_spice_price[id].mul(
                    1.2 ** n
                )
                game.red_spice_gen[id] = game.red_spice_gen[id].add(n)
                game.red_spice_bought[id] += n

                game.red_spice_boost[id] = new Decimal(
                    Math.floor(game.red_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.red_spice_boost[id] = new Decimal(
                        Math.floor(game.red_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "yellow":
            n =
                Math.floor(game.yellow_spice_bought[id] / 10) * 10 +
                10 -
                game.yellow_spice_bought[id]

            price = game.yellow_spice_price[id].mul(1 - 1.3 ** n).div(-0.3)

            if (game.yellow_spice.cmp(price) >= 0) {
                game.yellow_spice = game.yellow_spice.sub(price)
                game.yellow_spice_price[id] = game.yellow_spice_price[id].mul(
                    1.3 ** n
                )
                game.yellow_spice_gen[id] = game.yellow_spice_gen[id].add(n)
                game.yellow_spice_bought[id] += n

                game.yellow_spice_boost[id] = new Decimal(
                    Math.floor(game.yellow_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.yellow_spice_boost[id] = new Decimal(
                        Math.floor(game.yellow_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "green":
            n =
                Math.floor(game.green_spice_bought[id] / 10) * 10 +
                10 -
                game.green_spice_bought[id]

            price = game.green_spice_price[id].mul(1 - 1.4 ** n).div(-0.4)

            if (game.green_spice.cmp(price) >= 0) {
                game.green_spice = game.green_spice.sub(price)
                game.green_spice_price[id] = game.green_spice_price[id].mul(
                    1.4 ** n
                )
                game.green_spice_gen[id] = game.green_spice_gen[id].add(n)
                game.green_spice_bought[id] += n

                game.green_spice_boost[id] = new Decimal(
                    Math.floor(game.green_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.green_spice_boost[id] = new Decimal(
                        Math.floor(game.green_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "blue":
            n =
                Math.floor(game.blue_spice_bought[id] / 10) * 10 +
                10 -
                game.blue_spice_bought[id]

            price = game.blue_spice_price[id].mul(1 - 1.5 ** n).div(-0.5)

            if (game.blue_spice.cmp(price) >= 0) {
                game.blue_spice = game.blue_spice.sub(price)
                game.blue_spice_price[id] = game.blue_spice_price[id].mul(
                    1.5 ** n
                )
                game.blue_spice_gen[id] = game.blue_spice_gen[id].add(n)
                game.blue_spice_bought[id] += n

                game.blue_spice_boost[id] = new Decimal(
                    Math.floor(game.blue_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.blue_spice_boost[id] = new Decimal(
                        Math.floor(game.blue_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "pink":
            n =
                Math.floor(game.pink_spice_bought[id] / 10) * 10 +
                10 -
                game.pink_spice_bought[id]

            price = game.pink_spice_price[id].mul(1 - 1.6 ** n).div(-0.6)

            if (game.pink_spice.cmp(price) >= 0) {
                game.pink_spice = game.pink_spice.sub(price)
                game.pink_spice_price[id] = game.pink_spice_price[id].mul(
                    1.6 ** n
                )
                game.pink_spice_gen[id] = game.pink_spice_gen[id].add(n)
                game.pink_spice_bought[id] += n

                game.pink_spice_boost[id] = new Decimal(
                    Math.floor(game.pink_spice_bought[id] / 10) + 1
                ).pow(game.prestige_bought[3] + 1)
                if (game.ascend_challenge === 1 || game.ascend_challenge === 6)
                    game.pink_spice_boost[id] = new Decimal(
                        Math.floor(game.pink_spice_bought[id] / 10) + 1
                    )
            }
            break
        case "crystal":
            n =
                Math.floor(game.crystal_spice_bought[id] / 5) * 5 +
                5 -
                game.crystal_spice_bought[id]

            price = game.crystal_spice_price[id].mul(1 - 2 ** n).div(-1)

            if (game.rainbow_spice.cmp(price) >= 0) {
                game.rainbow_spice = game.rainbow_spice.sub(price)
                game.crystal_spice_price[id] = game.crystal_spice_price[id].mul(
                    2 ** n
                )
                game.crystal_spice_gen[id] = game.crystal_spice_gen[id].add(n)
                game.crystal_spice_bought[id] += n

                game.crystal_spice_boost[id] = Decimal.pow(
                    2,
                    Math.floor(game.crystal_spice_bought[id] / 5)
                )
            }
            break
        case "arcane":
            if (budget !== undefined) {
                n =
                    Math.floor(game.arcane_spice_bought[id] / 3) * 3 +
                    3 -
                    game.arcane_spice_bought[id]

                price = Math.round(
                    (game.arcane_spice_price[id] * (1 - 1.1 ** n)) / -0.1
                )

                if (budget >= price) {
                    game.ansuz -= price
                    budget -= price
                    game.arcane_spice_price[id] *= 1.1 ** n
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(n)
                    game.arcane_spice_bought[id] += n

                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[id] / 3)
                    )

                    return budget
                }
            } else {
                n =
                    Math.floor(game.arcane_spice_bought[id] / 3) * 3 +
                    3 -
                    game.arcane_spice_bought[id]

                price = Math.round(
                    (game.arcane_spice_price[id] * (1 - 1.1 ** n)) / -0.1
                )

                if (game.ansuz >= price) {
                    game.ansuz -= price
                    game.arcane_spice_price[id] *= 1.1 ** n
                    game.arcane_spice_gen[id] = game.arcane_spice_gen[id].add(n)
                    game.arcane_spice_bought[id] += n

                    game.arcane_spice_boost[id] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[id] / 3)
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
                game.red_spice = game.red_spice.sub(game.red_strengthener_price)
                game.red_strengthener_price =
                    game.red_strengthener_price.mul(10000)
                if (game.red_strengthener >= 25)
                    game.red_strengthener_price =
                        game.red_strengthener_price.mul(
                            Decimal.pow(a, game.red_strengthener - 24)
                        )
                game.red_strengthener += 1
            }
            break
        case "yellow":
            if (game.yellow_spice.cmp(game.yellow_strengthener_price) >= 0) {
                game.yellow_spice = game.yellow_spice.sub(
                    game.yellow_strengthener_price
                )
                game.yellow_strengthener_price =
                    game.yellow_strengthener_price.mul(10000)
                if (game.yellow_strengthener >= 25)
                    game.yellow_strengthener_price =
                        game.yellow_strengthener_price.mul(
                            Decimal.pow(a, game.yellow_strengthener - 24)
                        )
                game.yellow_strengthener += 1
            }
            break
        case "green":
            if (game.green_spice.cmp(game.green_strengthener_price) >= 0) {
                game.green_spice = game.green_spice.sub(
                    game.green_strengthener_price
                )
                game.green_strengthener_price =
                    game.green_strengthener_price.mul(10000)
                if (game.green_strengthener >= 25)
                    game.green_strengthener_price =
                        game.green_strengthener_price.mul(
                            Decimal.pow(a, game.green_strengthener - 24)
                        )
                game.green_strengthener += 1
            }
            break
        case "blue":
            if (game.blue_spice.cmp(game.blue_strengthener_price) >= 0) {
                game.blue_spice = game.blue_spice.sub(
                    game.blue_strengthener_price
                )
                game.blue_strengthener_price =
                    game.blue_strengthener_price.mul(10000)
                if (game.blue_strengthener >= 25)
                    game.blue_strengthener_price =
                        game.blue_strengthener_price.mul(
                            Decimal.pow(a, game.blue_strengthener - 24)
                        )
                game.blue_strengthener += 1
            }
            break
        case "pink":
            if (game.pink_spice.cmp(game.pink_strengthener_price) >= 0) {
                game.pink_spice = game.pink_spice.sub(
                    game.pink_strengthener_price
                )
                game.pink_strengthener_price =
                    game.pink_strengthener_price.mul(10000)
                if (game.pink_strengthener >= 25)
                    game.pink_strengthener_price =
                        game.pink_strengthener_price.mul(
                            Decimal.pow(a, game.pink_strengthener - 24)
                        )
                game.pink_strengthener += 1
            }
            break
        case "crystal":
            if (game.rainbow_spice.cmp(game.crystal_strengthener_price) >= 0) {
                game.rainbow_spice = game.rainbow_spice.sub(
                    game.crystal_strengthener_price
                )
                game.crystal_strengthener_price =
                    game.crystal_strengthener_price.mul(64)
                game.crystal_strengthener += 1
            }
            break
        case "arcane":
            if (game.ansuz >= Math.round(game.arcane_strengthener_price)) {
                game.ansuz -= Math.round(game.arcane_strengthener_price)
                game.arcane_strengthener_price *= 8
                game.arcane_strengthener += 1
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
                    game.red_spice = game.red_spice.sub(price)
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
                        game.red_spice = game.red_spice.sub(price)
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
            for (let i = 5; i >= 0; i--) {
                if (game.red_spice_bought[i] === 0) buy_gen("red", i)
                buy_until10("red", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.red_spice
                                .mul(-0.2)
                                .div(game.red_spice_price[i])
                        )
                        .log(10) / Math.log10(1.2)
                )
                if (game.red_spice_bought[i] >= 10) n = Math.floor(n / 10) * 10
                if (n > 0) {
                    let price = game.red_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(1.2).pow(n)))
                        .div(-0.2)
                    game.red_spice = game.red_spice.sub(price)
                    game.red_spice_price[i] = game.red_spice_price[i].mul(
                        new Decimal(1.2).pow(n)
                    )
                    game.red_spice_gen[i] = game.red_spice_gen[i].add(n)
                    game.red_spice_bought[i] += n

                    game.red_spice_boost[i] = new Decimal(
                        Math.floor(game.red_spice_bought[i] / 10) + 1
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6
                    )
                        game.red_spice_boost[i] = new Decimal(
                            Math.floor(game.red_spice_bought[i] / 10) + 1
                        )
                }
            }
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
                    game.yellow_spice = game.yellow_spice.sub(price)
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
                        game.yellow_spice = game.yellow_spice.sub(price)
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
            for (let i = 5; i >= 0; i--) {
                if (game.yellow_spice_bought[i] === 0) buy_gen("yellow", i)
                buy_until10("yellow", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.yellow_spice
                                .mul(-0.3)
                                .div(game.yellow_spice_price[i])
                        )
                        .log(10) / Math.log10(1.3)
                )
                if (game.yellow_spice_bought[i] > +10)
                    n = Math.floor(n / 10) * 10
                if (n > 0) {
                    let price = game.yellow_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(1.3).pow(n)))
                        .div(-0.3)
                    game.yellow_spice = game.yellow_spice.sub(price)
                    game.yellow_spice_price[i] = game.yellow_spice_price[i].mul(
                        new Decimal(1.3).pow(n)
                    )
                    game.yellow_spice_gen[i] = game.yellow_spice_gen[i].add(n)
                    game.yellow_spice_bought[i] += n

                    game.yellow_spice_boost[i] = new Decimal(
                        Math.floor(game.yellow_spice_bought[i] / 10) + 1
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6
                    )
                        game.yellow_spice_boost[i] = new Decimal(
                            Math.floor(game.yellow_spice_bought[i] / 10) + 1
                        )
                }
            }
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
                    game.green_spice = game.green_spice.sub(price)
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
                        game.green_spice = game.green_spice.sub(price)
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
            for (let i = 5; i >= 0; i--) {
                if (game.green_spice_bought[i] === 0) buy_gen("green", i)
                buy_until10("green", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.green_spice
                                .mul(-0.4)
                                .div(game.green_spice_price[i])
                        )
                        .log(10) / Math.log10(1.4)
                )
                if (game.green_spice_bought[i] >= 10)
                    n = Math.floor(n / 10) * 10
                if (n > 0) {
                    let price = game.green_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(1.4).pow(n)))
                        .div(-0.4)
                    game.green_spice = game.green_spice.sub(price)
                    game.green_spice_price[i] = game.green_spice_price[i].mul(
                        new Decimal(1.4).pow(n)
                    )
                    game.green_spice_gen[i] = game.green_spice_gen[i].add(n)
                    game.green_spice_bought[i] += n

                    game.green_spice_boost[i] = new Decimal(
                        Math.floor(game.green_spice_bought[i] / 10) + 1
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6
                    )
                        game.green_spice_boost[i] = new Decimal(
                            Math.floor(game.green_spice_bought[i] / 10) + 1
                        )
                }
            }
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
                    game.blue_spice = game.blue_spice.sub(price)
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
                        game.blue_spice = game.blue_spice.sub(price)
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
            for (let i = 5; i >= 0; i--) {
                if (game.blue_spice_bought[i] === 0) buy_gen("blue", i)
                buy_until10("blue", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.blue_spice
                                .mul(-0.5)
                                .div(game.blue_spice_price[i])
                        )
                        .log(10) / Math.log10(1.5)
                )
                if (game.blue_spice_bought[i] >= 10) n = Math.floor(n / 10) * 10
                if (n > 0) {
                    let price = game.blue_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(1.5).pow(n)))
                        .div(-0.5)
                    game.blue_spice = game.blue_spice.sub(price)
                    game.blue_spice_price[i] = game.blue_spice_price[i].mul(
                        new Decimal(1.5).pow(n)
                    )
                    game.blue_spice_gen[i] = game.blue_spice_gen[i].add(n)
                    game.blue_spice_bought[i] += n

                    game.blue_spice_boost[i] = new Decimal(
                        Math.floor(game.blue_spice_bought[i] / 10) + 1
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6
                    )
                        game.blue_spice_boost[i] = new Decimal(
                            Math.floor(game.blue_spice_bought[i] / 10) + 1
                        )
                }
            }
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
                    game.pink_spice = game.pink_spice.sub(price)
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
                        game.pink_spice = game.pink_spice.sub(price)
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
            for (let i = 5; i >= 0; i--) {
                if (game.pink_spice_bought[i] === 0) buy_gen("pink", i)
                buy_until10("pink", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.pink_spice
                                .mul(-0.6)
                                .div(game.pink_spice_price[i])
                        )
                        .log(10) / Math.log10(1.6)
                )
                if (game.pink_spice_bought[i] >= 10) n = Math.floor(n / 10) * 10
                if (n > 0) {
                    let price = game.pink_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(1.6).pow(n)))
                        .div(-0.6)
                    game.pink_spice = game.pink_spice.sub(price)
                    game.pink_spice_price[i] = game.pink_spice_price[i].mul(
                        new Decimal(1.6).pow(n)
                    )
                    game.pink_spice_gen[i] = game.pink_spice_gen[i].add(n)
                    game.pink_spice_bought[i] += n

                    game.pink_spice_boost[i] = new Decimal(
                        Math.floor(game.pink_spice_bought[i] / 10) + 1
                    ).pow(game.prestige_bought[3] + 1)
                    if (
                        game.ascend_challenge === 1 ||
                        game.ascend_challenge === 6
                    )
                        game.pink_spice_boost[i] = new Decimal(
                            Math.floor(game.pink_spice_bought[i] / 10) + 1
                        )
                }
            }
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
                game.rainbow_spice = game.rainbow_spice.sub(price)
                game.crystal_strengthener_price =
                    game.crystal_strengthener_price.mul(new Decimal(64).pow(n))
                game.crystal_strengthener += n
            }
            for (let i = 5; i >= 0; i--) {
                if (game.crystal_spice_bought[i] === 0) buy_gen("crystal", i)
                buy_until10("crystal", i)
                let n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.rainbow_spice
                                .mul(-1)
                                .div(game.crystal_spice_price[i])
                        )
                        .log(10) / Math.log10(2)
                )
                if (game.crystal_spice_bought[i] >= 5) n = Math.floor(n / 5) * 5
                if (n > 0) {
                    let price = game.crystal_spice_price[i]
                        .mul(new Decimal(1).sub(new Decimal(2).pow(n)))
                        .div(-1)
                    game.rainbow_spice = game.rainbow_spice.sub(price)
                    game.crystal_spice_price[i] = game.crystal_spice_price[
                        i
                    ].mul(new Decimal(2).pow(n))
                    game.crystal_spice_gen[i] = game.crystal_spice_gen[i].add(n)
                    game.crystal_spice_bought[i] += n

                    game.crystal_spice_boost[i] = Decimal.pow(
                        2,
                        Math.floor(game.crystal_spice_bought[i] / 5)
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
                game.ansuz -= price
                game.arcane_strengthener_price *= 8 ** n
                game.arcane_strengthener += n
            }
            for (let i = 5; i >= 0; i--) {
                if (game.arcane_spice_bought[i] === 0) buy_gen("arcane", i)
                buy_until10("arcane", i)
                let n = Math.floor(
                    Math.log10(
                        1 - (game.ansuz * -0.1) / game.arcane_spice_price[i]
                    ) / Math.log10(1.1)
                )
                if (game.arcane_spice_bought[i] >= 3) n = Math.floor(n / 3) * 3
                if (n > 0) {
                    let price = Math.round(
                        (game.arcane_spice_price[i] * (1 - 1.1 ** n)) / -0.1
                    )
                    game.ansuz -= price
                    game.arcane_spice_price[i] *= 1.1 ** n
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(n)
                    game.arcane_spice_bought[i] += n

                    game.arcane_spice_boost[i] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[i] / 3)
                    )
                }
            }
            break
        case "arcane_half":
            let budget = game.ansuz / 2
            n = Math.floor(
                Math.log10(1 - (budget * -7) / game.arcane_strengthener_price) /
                    Math.log10(8)
            )
            if (n > 0) {
                let price = Math.round(
                    (game.arcane_strengthener_price * (1 - 8 ** n)) / -7
                )
                game.ansuz -= price
                budget -= price
                game.arcane_strengthener_price *= 8 ** n
                game.arcane_strengthener += n
            }
            for (let i = 5; i >= 0; i--) {
                let temp_budget = budget
                if (game.arcane_spice_bought[i] === 0)
                    temp_budget = buy_gen("arcane", i, budget)
                if (temp_budget !== undefined) budget = temp_budget
                temp_budget = buy_until10("arcane", i, budget)
                if (temp_budget !== undefined) budget = temp_budget
                let n = Math.floor(
                    Math.log10(
                        1 - (budget * -0.1) / game.arcane_spice_price[i]
                    ) / Math.log10(1.1)
                )
                if (game.arcane_spice_bought[i] >= 3) n = Math.floor(n / 3) * 3
                if (n > 0) {
                    let price = Math.round(
                        (game.arcane_spice_price[i] * (1 - 1.1 ** n)) / -0.1
                    )
                    game.ansuz -= price
                    budget -= price
                    game.arcane_spice_price[i] *= 1.1 ** n
                    game.arcane_spice_gen[i] = game.arcane_spice_gen[i].add(n)
                    game.arcane_spice_bought[i] += n

                    game.arcane_spice_boost[i] = Decimal.pow(
                        3,
                        Math.floor(game.arcane_spice_bought[i] / 3)
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
    }
}

//buying prestige upgrades
function buy_prestige_upgrade(id, max) {
    if (max) {
        while (
            game.rainbow_spice.cmp(prestige_upgrade.upgrades[id].price) >= 0 &&
            game.prestige_bought[id] < prestige_upgrade.upgrades[id].max
        ) {
            game.rainbow_spice = game.rainbow_spice.sub(
                prestige_upgrade.upgrades[id].price
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
            game.rainbow_spice = game.rainbow_spice.sub(
                prestige_upgrade.upgrades[id].price
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
        game.crystal_spice = game.crystal_spice.sub(game.crystal_infusion_price)
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
        game.crystal_infusion += 1
    }
}

//maxing crystal infusions
function max_infusion() {
    let n = 0
    if (game.crystal_spice.cmp(game.crystal_infusion_price) >= 0) {
        if (game.crystal_infusion < 20) {
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.crystal_spice
                            .mul(-3)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(4)
            )
            if (game.crystal_infusion + n >= 20) n = 20 - game.crystal_infusion
            if (n > 0) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(4).pow(n)))
                    .div(-3)
                game.crystal_spice = game.crystal_spice.sub(price)
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(4).pow(n)
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 50) {
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.crystal_spice
                            .mul(-23)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(24)
            )
            if (game.crystal_infusion + n >= 50) n = 50 - game.crystal_infusion
            if (n > 0) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(24).pow(n)))
                    .div(-23)
                game.crystal_spice = game.crystal_spice.sub(price)
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(24).pow(n)
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 160) {
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.crystal_spice
                            .mul(-191)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(192)
            )
            if (game.crystal_infusion + n >= 160)
                n = 160 - game.crystal_infusion
            if (n > 0) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(192).pow(n)))
                    .div(-191)
                game.crystal_spice = game.crystal_spice.sub(price)
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(192).pow(n)
                )
                game.crystal_infusion += n
            }
        }
        if (game.crystal_infusion < 22500) {
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.crystal_spice
                            .mul(-1919)
                            .div(game.crystal_infusion_price)
                    )
                    .log(10) / Math.log10(1920)
            )
            if (game.crystal_infusion + n >= 22500)
                n = 22500 - game.crystal_infusion
            if (n > 0) {
                let price = game.crystal_infusion_price
                    .mul(new Decimal(1).sub(new Decimal(1920).pow(n)))
                    .div(-1919)
                game.crystal_spice = game.crystal_spice.sub(price)
                game.crystal_infusion_price = game.crystal_infusion_price.mul(
                    new Decimal(1920).pow(n)
                )
                game.crystal_infusion += n
            }
        }
        n = Math.floor(
            new Decimal(1)
                .sub(
                    game.crystal_spice
                        .mul(-2.304 * 10 ** 12 + 1)
                        .div(game.crystal_infusion_price)
                )
                .log(10) / Math.log10(2.304 * 10 ** 12)
        )
        if (n > 0) {
            let price = game.crystal_infusion_price
                .mul(new Decimal(1).sub(new Decimal(2.304 * 10 ** 12).pow(n)))
                .div(-2.304 * 10 ** 12 + 1)
            game.crystal_spice = game.crystal_spice.sub(price)
            game.crystal_infusion_price = game.crystal_infusion_price.mul(
                new Decimal(2.304 * 10 ** 12).pow(n)
            )
            game.crystal_infusion += n
        }
    }
}

//convert runes
function convert_rune(id, max) {
    if (game.ansuz >= 1) {
        if (max) {
            game.rune[id] += game.ansuz
            game.ansuz = 0
        } else {
            game.rune[id]++
            game.ansuz--
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

    game.ansuz -= amount * 3
    for (let i = 0; i < 3; i++) {
        game.rune[i] += amount
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
                if (game.ascend_bought[u.id]) {
                    game.ascend_bought[u.id] = false
                    game.ansuz += u.price
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
                console.log(game.arcane_spice_bought[i] > 0)
                if (game.arcane_spice_bought[i] > 0) {
                    game.ansuz += Math.floor(
                        (spice_gen.generators[36 + i].base_price *
                            (1 - 1.1 ** game.arcane_spice_bought[i])) /
                            -0.1
                    )
                    game.arcane_spice_bought[i] = 0
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
                if (game.ascend_bought[u.id]) {
                    game.ascend_bought[u.id] = false
                    game.ansuz += u.price
                }
            }

            for (let i = 0; i < 6; i++) {
                if (game.arcane_spice_bought[i] > 0) {
                    game.ansuz += Math.floor(
                        (spice_gen.generators[36 + i].base_price *
                            (1 - 1.1 ** game.arcane_spice_bought[i])) /
                            -0.1
                    )
                    game.arcane_spice_bought[i] = 0
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
                        ascension_upgrade.upgrades[upgrade1].challenge - 1
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
        game.ansuz >= ascension_upgrade.upgrades[id].price &&
        !game.ascend_bought[id] &&
        condition1 &&
        condition2 &&
        id < 34
    ) {
        game.ansuz -= ascension_upgrade.upgrades[id].price
        game.ascend_bought[id] = true
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
        }
    } else {
        alert(
            "You cannot enter an Ascension Challenge if you are already in one!"
        )
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
        game.arcane_spice = game.arcane_spice.sub(game.arcane_enchantment_price)
        game.arcane_enchantment_price = game.arcane_enchantment_price.mul(4)
        if (game.arcane_enchantment >= 25 && game.ascend_challenge !== 5)
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(5)
        if (game.arcane_enchantment >= 125 && game.ascend_challenge !== 5)
            game.arcane_enchantment_price = game.arcane_enchantment_price.mul(6)
        if (game.arcane_enchantment >= 5000 && game.ascend_challenge !== 5)
            game.arcane_enchantment_price =
                game.arcane_enchantment_price.mul(665280)

        game.arcane_enchantment += 1
        game.ascend_challenge_timer = 0
    }
}

//maxing arcane enchantments
function max_enchantment() {
    if (game.arcane_spice.cmp(game.arcane_enchantment_price) >= 0) {
        if (game.ascend_challenge === 5) {
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.arcane_spice
                            .mul(-3)
                            .div(game.arcane_enchantment_price)
                    )
                    .log(10) / Math.log10(4)
            )
            if (n > 0) {
                let price = game.arcane_enchantment_price
                    .mul(new Decimal(1).sub(new Decimal(4).pow(n)))
                    .div(-3)
                game.arcane_spice = game.arcane_spice.sub(price)
                game.arcane_enchantment_price =
                    game.arcane_enchantment_price.mul(new Decimal(4).pow(n))
                game.arcane_enchantment += n
                game.ascend_challenge_timer = 0
            }
        } else {
            if (game.arcane_enchantment < 25) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-3)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(4)
                )
                if (game.arcane_enchantment + n >= 25)
                    n = 25 - game.arcane_enchantment
                if (n > 0) {
                    let price = game.arcane_enchantment_price
                        .mul(new Decimal(1).sub(new Decimal(4).pow(n)))
                        .div(-3)
                    game.arcane_spice = game.arcane_spice.sub(price)
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(new Decimal(4).pow(n))
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 125) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-19)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(20)
                )
                if (game.arcane_enchantment + n >= 125)
                    n = 125 - game.arcane_enchantment
                if (n > 0) {
                    let price = game.arcane_enchantment_price
                        .mul(new Decimal(1).sub(new Decimal(20).pow(n)))
                        .div(-19)
                    game.arcane_spice = game.arcane_spice.sub(price)
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(20).pow(n)
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            if (game.arcane_enchantment < 5000) {
                n = Math.floor(
                    new Decimal(1)
                        .sub(
                            game.arcane_spice
                                .mul(-119)
                                .div(game.arcane_enchantment_price)
                        )
                        .log(10) / Math.log10(120)
                )
                if (game.arcane_enchantment + n >= 5000)
                    n = 5000 - game.arcane_enchantment
                if (n > 0) {
                    let price = game.arcane_enchantment_price
                        .mul(new Decimal(1).sub(new Decimal(120).pow(n)))
                        .div(-119)
                    game.arcane_spice = game.arcane_spice.sub(price)
                    game.arcane_enchantment_price =
                        game.arcane_enchantment_price.mul(
                            new Decimal(120).pow(n)
                        )
                    game.arcane_enchantment += n
                    game.ascend_challenge_timer = 0
                }
            }
            n = Math.floor(
                new Decimal(1)
                    .sub(
                        game.arcane_spice
                            .mul(-79833599)
                            .div(game.arcane_enchantment_price)
                    )
                    .log(10) / Math.log10(79833600)
            )
            if (n > 0) {
                let price = game.arcane_enchantment_price
                    .mul(new Decimal(1).sub(new Decimal(79833600).pow(n)))
                    .div(-779833599)
                game.arcane_spice = game.arcane_spice.sub(price)
                game.arcane_enchantment_price =
                    game.arcane_enchantment_price.mul(
                        new Decimal(79833600).pow(n)
                    )
                game.arcane_enchantment += n
                game.ascend_challenge_timer = 0
            }
        }
    }
}
