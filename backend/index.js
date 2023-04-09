  import express from "express"
  import mysql from "mysql"
  import cors from "cors"

  const app = express()
  const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"hotel_project_db",
    multipleStatements: true
  })

  app.use(express.json())
  app.use(cors())

  app.post('/login', (req, res) => {
    const q = `SELECT EXISTS (SELECT * FROM customers WHERE SSN = ${req.body.SSN}); SELECT EXISTS (SELECT * FROM employees WHERE SSN = ${req.body.SSN});`

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })
  })

  /** Update customer, employee, hotels, rooms
   * 
   * {
   * 
   *  update: "customer",
   *  SSN: 123456789
   *  full_name: "Person McPerson"
   * 
   * }
   * 
   */

  app.post('/update', (req, res) => {

    let q = ""

    if (req.body.update === "customer") {

      if ("full_name" in req.body) {
        q += `UPDATE customers SET full_name = '${req.body.full_name}' WHERE SSN = ${req.body.SSN};`
      }

      if ("address" in req.body) {
        q += `UPDATE customers SET address = '${req.body.address}' WHERE SSN = ${req.body.SSN};`
      }

    } else if (req.body.update === "employee") {

      if ("full_name" in req.body) {
        q += `UPDATE employees SET full_name = '${req.body.full_name}' WHERE SSN = ${req.body.SSN};`
      }

      if ("address" in req.body) {
        q += `UPDATE employees SET address = '${req.body.address}' WHERE SSN = ${req.body.SSN};`
      }

      if ("works_at" in req.body) {
        q += `UPDATE employees SET works_at = '${req.body.works_at}' WHERE SSN = ${req.body.SSN};`
      }

      if ("role" in req.body) {
        q += `UPDATE employees SET role = '${req.body.role}' WHERE SSN = ${req.body.SSN};`
      }

    } else if (req.body.update === "hotel") {

      if ("chainName" in req.body) {
        q += `UPDATE hotels SET chainName = '${req.body.chain_name}' WHERE address = '${req.body.address}';`
      }

      if ("city" in req.body) {
        q += `UPDATE hotels SET city = '${req.body.city}' WHERE address = '${req.body.address}';`
      }

      if ("country" in req.body) {
        q += `UPDATE hotels SET country = '${req.body.country}' WHERE address = '${req.body.address}';`
      }

      if ("rating" in req.body) {
        q += `UPDATE hotels SET star_rating = '${req.body.rating}' WHERE address = '${req.body.address}';`
      }

      if ("num_rooms" in req.body) {
        q += `UPDATE hotels SET num_rooms = '${req.body.num_rooms}' WHERE address = '${req.body.address}';`
      }

      if ("phone_num" in req.body) {
        q += `UPDATE hotels SET phoneNumber = '${req.body.phone_num}' WHERE address = '${req.body.address}';`
      }

      if ("manager" in req.body) {
        q += `UPDATE hotels SET manager = '${req.body.manager}' WHERE address = '${req.body.address}';`
      }

    } else if (req.body.updates === "room") {

      if ("price" in req.body) {
        q += `UPDATE rooms SET price = ${req.body.price} WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

      if ("capacity" in req.body) {
        q += `UPDATE rooms SET capacity = ${req.body.capacity} WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

      if ("view_type" in req.body) {
        if (req.body.view_type !== null) {
          req.body.view_type = `'${req.body.view_type}'`
        }
        q += `UPDATE rooms SET view_type = ${req.body.view_type} WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

      if ("amenities" in req.body) {
        if (req.body.amenities !== null) {
          req.body.amenities = `'${req.body.amenities}'`
        }
        q += `UPDATE rooms SET amenities = ${req.body.amenities} WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

      if ("expendable" in req.body) {
        q += `UPDATE rooms SET expandable = ${req.body.expandable} WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

      if ("status" in req.body) {
        q += `UPDATE rooms SET 'status' = '${req.body.status}' WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.address}';`
      }

    } 

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })

  })

  /** Insert employee, hotels, rooms (with validation)
   * 
   * {
   * 
   *  insert: "employee",
   *  SSN: 123456789,
   *  name: "John Doe",
   *  role: "Manager"
   * 
   * } OR
   * 
   * {
   * 
   *  insert: "hotel",
   *  address: "66 Test Drive",
   *  chain_name: "Test Hotels",
   *  city: "Ottawa",
   *  country: "Canada",
   *  rating: 5,
   *  num_rooms: 8,
   *  phone_num: "905-666-6666",
   *  manager: "John Smith"
   * 
   * } OR 
   * 
   * {
   *
   *  "insert": "room",
   * "room_num": 1,
   * "address": "112 Flint Drive",
   * "price": 500,
   * "capacity": 1,
   * "view_type": null,
   * "amenities": "test",
   * "expandable": 1,
   * "status": "Available"
   * 
   * }
   * 
   */

  app.post('/insert', (req, res) => {

    let q = "";

    if (req.body.insert === "employee") {
      q += "INSERT INTO employees(SSN, full_name, works_at, role) " + 
           `VALUE (${req.body.SSN}, '${req.body.name}', '${req.body.address}', '${req.body.role})'; `
    } else if (req.body.insert === "hotel") {
      q += "INSERT INTO hotels(address, chainName, city, country, star_rating, num_rooms, phoneNumber, manager) " +
           `VALUES ('${req.body.address}', '${req.body.chain_name}', '${req.body.city}', '${req.body.country}', ${req.body.rating}, ${req.body.num_rooms}, '${req.body.phone_num}', ${req.body.manager});`
    } else if (req.body.insert === "room") {
      if (req.body.view_type !== null) {
        req.body.view_type = `'${req.body.view_type}'`
      }

      if (req.body.amenities !== null) {
        req.body.amenities = `'${req.body.amenities}'`
      }
      q += "INSERT INTO roooms(room_num, hotel, price, capacity, view_type, amentities, expandable, `status`) " +
           `VALUES (${req.body.room_num}, '${req.body.address}', ${req.body.price}, ${req.body.capacity}, ${req.body.view_type}, ${req.body.amenities}, ${req.body.expandable}, '${req.body.status}');`
    }

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })

  })

  /** Delete chain, hotel, room, employee, customers
   * 
   * {
   * 
   *  delete: "chain",
   *  name: "Best Western",
   * 
   * } OR 
   * 
   * {
   * 
   *  delete: "hotel",
   *  address: "112 Flint Place"
   * 
   * } OR
   * 
   * {
   * 
   *  delete: "room"
   *  hotel: "112 Flint Place",
   *  room_num: "1"
   * 
   * } OR
   * 
   * {
   * 
   *  delete: "customer",
   *  SSN: 123456789
   * 
   * } OR
   * 
   * {
   * 
   *  delete: "employees",
   *  SSN: 123456789
   * 
   * }
   * 
   */

  app.post('/delete', (req, res) => {

    let q = "DELETE FROM ";

    if (req.body.delete === "chain") {
      q += `hotelchains WHERE name = '${req.body.name}';`
    } else if (req.body.delete === "hotel") {
      q += `hotels WHERE address = '${req.body.address}';`
    } else if (req.body.delete === "room") {
      q += `rooms WHERE room_num = ${req.body.room_num} AND hotel = '${req.body.hotel}'`
    } else if (req.body.delete === "customers") {
      q += `customers WHERE SSN = ${req.body.SSN};`
    } else if (req.body.delete === "employees") {
      q += `employees WHERE SSN = ${req.body.SSN};`
    }

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })

  })

  /** Register Customer
   * 
   * {
   * 
   *  SSN: 123456789,
   *  name: "John Smith",
   *  address: "56 Test Drive"
   * 
   * }
   * 
   */

  app.post('/register', (req, res) => {
    const q = `INSERT INTO customers (SSN,full_name, address) VALUE (${req.body.SSN},'${req.body.name}','${req.body.address}');`
  
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })
  
  })

  /** Book room
   * 
   * {
   * 
   *  room_num: 1,
   *  hotel: "112 Flint Place",
   *  customer: 123456789,
   *  start_date: "2023-04-04",
   *  end_date: "2023-04-05",
   * 
   * }
   * 
   */

  app.post('/book', (req, res) => {

    const q = "INSERT INTO bookings(room_num, hotel, customer, isPaid, startDate, endDate) " +
              `Value (${req.body.room_num},'${req.body.hotel}','${req.body.customer}',FALSE,'${req.body.start_date}','${req.body.end_date}')`;

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })


  })

  /** Change from booking to renting or immediately rent
   * 
   * {
   * 
   *  rent_now: true,
   *  room_num: 1,
   *  hotel: 123 Test Drive,
   *  customer: 123456,
   *  start_date: 2023-04-04,
   *  end_date: 2023-04-06
   * 
   * }
   * 
   * OR 
   * 
   * {
   * 
   *  rent_now: false,
   *  room_num: 1,
   *  hotel: "123 Test Drive",
   *  customer: 123456,
   *  start_date: 2023-04-04,
   *  end_date: 2023-04-06
   * 
   * }
   * 
   * */

  app.post("/rent", (req, res) => {

    let q = ""

    if (req.body.rent_now === true) {
      q = "INSERT INTO bookings(room_num, hotel, customer, isPaid, startDate, endDate) " +
          `Value (${req.body.room_num}, '${req.body.hotel}' ,${req.body.customer},TRUE,'${req.body.start_date}','${req.body.end_date}');`
    } else {
      q = "UPDATE bookings " +
          "SET isPaid = TRUE " +
          `WHERE customer = ${req.body.customer} ` +
          `AND room_num = ${req.body.room_num} ` + 
          `AND hotel = '${req.body.hotel}' ` + 
          `AND startDate = '${req.body.start_date}' ` +
          `AND endDate = '${req.body.end_date}';`
    }

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }

      return res.json(data)
    })

  })

  /**
   * EXAMPLE QUERY, search by date, area, and rating 
   * 
   * {
   * 
   *  start_date: "2020-02-02",
   *  end_date: "2020-02-05",
   *  room_capacity: "",
   *  city: "Santa Clara",
   *  country: "United States",
   *  chain: "",
   *  rating: 3,
   *  num_rooms: "",
   *  price_low: "",
   *  price_high: ""
   * 
   * }
   * 
   * 
   */

  app.post("/query", (req, res) => {
    const q_start = "SELECT r.*, h.chainName, h.city, h.country, h.star_rating, h.num_rooms " +
                    "FROM rooms r " +
                    "JOIN hotels h ON r.hotel = h.address "
    let q_middle = ""
    const q_end = ";"

    // Start/end date
    if (req.body.start_date !== "" || req.body.end_date !== "") {
      q_middle += "LEFT JOIN bookings b ON r.room_num = b.room_num AND r.hotel = b.hotel " +
                  "WHERE (b.room_num IS NULL OR (";

      if (req.body.start_date !== "") {
        q_middle += `b.endDate < '${req.body.start_date}'`

        if (req.body.end_date !== "") {
          q_middle += ` OR b.startDate > '${req.body.end_date}'))`
        } else {
          q_middle += "))"
        }
      } else {
        q_middle += `b.startDate > '${req.body.end_date}'))`
      }
      

    } 

    // Capacity
    if (req.body.room_capacity !== "") {
      q_middle += ` AND r.capacity >= '${req.body.room_capacity}'`
    }
    
    // City
    if (req.body.city !== "") {
      q_middle += ` AND h.city = '${req.body.city}'`
    }
    
    // Country
    if (req.body.country !== "") {
      q_middle += ` AND h.country = '${req.body.country}'`
    }
    
    // star_rating
    if (req.body.rating !== "") {
      q_middle += ` AND h.star_rating >= '${req.body.rating}'`
    }
    
    // chain name
    if (req.body.chain !== "") {
      q_middle += ` AND h.chainName = '${req.body.chain}'`
    }

    // num_rooms
    if (req.body.num_rooms !== "") {
      q_middle += ` AND h.num_rooms >= '${req.body.num_rooms}'`
    }
    
    // price
    if (req.body.price_low !== "") {
      q_middle += ` AND r.price >= '${req.body.price_low}'`
    }
    
    // price
    if (req.body.price_high !== "") {
      q_middle += ` AND r.price <= '${req.body.price_high}'`
    }

    const q = q_start + q_middle + q_end;

    db.query(q, (err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data)
    })
  })

  app.get('/categories', (req, res) => {
  
    const q_area = "SELECT DISTINCT city, country FROM hotels;"
    const q_countries = "SELECT DISTINCT country FROM hotels;"
    const q_chain = "SELECT DISTINCT chainName FROM hotels;"
    const q_variable = "SELECT MIN(price) AS min_price, " + 
                        "MAX(price) AS max_price, " +
                        "MIN(num_rooms) AS min_num_rooms, " + 
                        "MAX(num_rooms) AS max_num_rooms, " +
                        "MIN(capacity) AS min_capacity, " +
                        "MAX(capacity) AS max_capacity " +
                        "FROM rooms r JOIN hotels h ON r.hotel = h.address;"

    db.query(q_area + q_countries + q_chain + q_variable, (err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data)
    })

  }) 


  app.listen(8800, () => {
    console.log("Connected to db!")
  })
