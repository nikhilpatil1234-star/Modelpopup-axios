import { useEffect, useState } from "react";
import axios from "axios";
import "./project.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Project() {
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [data, modelData] = useState([
    {
      id: "",
      title: "",
      url: "",
    },
  ]);
  const handleClose = () => setShow(false);
  const getUsers = async () => {
    setPhotos(
      (
        await axios.get(
          "https://jsonplaceholder.typicode.com/photos?_limit=100"
        )
      ).data
    );
  };
  //   console.log(photos);
  useEffect(() => {
    getUsers();
  }, []);

  const showDetail = (id) => {
    console.log("clicked");
    console.log(`${id}`);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((resp) => {
        console.log(resp.data);
        setShow(true);
        modelData(resp.data);
      });
  };
  return (
    <div className="row  containerfluid m-2 mainbodycontainer">
      <h1> Cards</h1>
      <div className=" row container m-2">
        {photos.map((photo, id) => {
          return (
            <>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <Card key={id} style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={photo.thumbnailUrl} />
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={(e) => showDetail(photo.id)}
                    >
                      Extra details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <img src={data.thumbnailUrl} alt="error" />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
