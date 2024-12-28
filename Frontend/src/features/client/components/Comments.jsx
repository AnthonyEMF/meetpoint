import { useState } from "react";
import { RiDeleteBin5Fill, RiEdit2Fill, RiReplyFill } from "react-icons/ri";
import { useAuthStore } from "../../security/store";
import { Link } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { ProtectedComponent } from "../../../shared/components";
import { rolesListConstant } from "../../../shared/constants";
import { useCommentsStore } from "../store/useCommentsStore";
import Swal from "sweetalert2";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export const Comments = ({ event, handleCommentsChange }) => {
  // Funciones para comentarios y autenticación
  const { createComment, editComment, deleteComment, isSubmitting, error } = useCommentsStore();
  const [newComment, setNewComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const getUserId = useAuthStore((state) => state.getUserId);
  const loggedUserId = getUserId(); // id del usuario en sesión

  // Crear un nuevo comentario o respuesta
  const handleCreateComment = async (parentId = null) => {
    const content = parentId ? replyContent.trim() : newComment.trim();
    if (!content) return;

    const commentData = {
      eventId: event.data.id,
      content,
      parentId,
    };

    await createComment(commentData);
    if (parentId) {
      setReplyContent("");
      setReplyCommentId(null);
    } else {
      setNewComment("");
    }
    if (handleCommentsChange) handleCommentsChange();
  };

  // Editar un comentario
  const handleEditComment = async (commentId) => {
    if (!editedContent.trim()) return;

    const commentData = {
      content: editedContent.trim(),
    };

    await editComment(commentId, commentData);
    setEditingCommentId(null);
    setEditedContent("");
    if (handleCommentsChange) handleCommentsChange();
  };

  // Eliminar un comentario
  const handleDeleteComment = async (commentId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el comentario de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteComment(commentId);
        if (handleCommentsChange) handleCommentsChange();
      }
    });
  };

  // Renderizar lista de comentarios
  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment.id}>
          <li
            className={`my-2 p-4 flex flex-col ${comment.parentId} bg-gray-200 rounded-md`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <Link
                  to={
                    comment.userId === loggedUserId
                      ? "/user"
                      : `/user/view/${comment.userId}`
                  }
                  className="flex items-center gap-2"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Perfil"
                    className="w-7 h-7 rounded-full"
                  />
                  <p className="flex font-semibold text-gray-900">
                    {comment.userName}
                    {comment?.userMembership && ( // Mostrar insignia de usuario premium
                      <MdOutlineWorkspacePremium size={25} className="text-yellow-500 ml-1"/>
                    )}
                  </p>
                </Link>

                {editingCommentId === comment.id ? (
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ minHeight: "100px" }}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800">{comment.content}</p>
                )}

                <p className="text-sm text-gray-500">
                  {new Date(comment.publicationDate).toLocaleDateString()}
                </p>
              </div>

              {/* Editar comentario para el dueño del comentario */}
              {comment.userId === loggedUserId && (
                <div className="flex space-x-2">
                  {editingCommentId === comment.id ? (
                    <div className="flex flex-col my-8 ml-4">
                      <button
                        className="mt-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                        onClick={() => handleEditComment(comment.id)}
                        disabled={isSubmitting}
                      >
                        Guardar
                      </button>
                      <button
                        className="mt-2 px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedContent("");
                        }}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="p-2 text-xl bg-green-500 text-white rounded-full hover:bg-green-700"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditedContent(comment.content);
                        }}
                        disabled={isSubmitting}
                      >
                        <RiEdit2Fill />
                      </button>
                      <button
                        className="p-2 text-xl bg-red-500 text-white rounded-full hover:bg-red-700"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isSubmitting}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Editar comentario para administradores */}
              <ProtectedComponent requiredRoles={[rolesListConstant.ADMIN]}>
                {comment.userId != loggedUserId && (
                  <div className="flex space-x-2">
                    {editingCommentId === comment.id ? (
                      <div className="flex flex-col my-8 ml-4">
                        <button
                          className="mt-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                          onClick={() => handleEditComment(comment.id)}
                          disabled={isSubmitting}
                        >
                          Guardar
                        </button>
                        <button
                          className="mt-2 px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditedContent("");
                          }}
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="p-2 text-xl bg-green-500 text-white rounded-full hover:bg-green-700"
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditedContent(comment.content);
                          }}
                          disabled={isSubmitting}
                        >
                          <RiEdit2Fill />
                        </button>
                        <button
                          className="p-2 text-xl bg-red-500 text-white rounded-full hover:bg-red-700"
                          onClick={() => handleDeleteComment(comment.id)}
                          disabled={isSubmitting}
                        >
                          <RiDeleteBin5Fill />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </ProtectedComponent>
            </div>
            {comment.parentId === null && (
              <button
                className="flex ml-2 pt-2 text-blue-500 rounded-lg hover:underline"
                onClick={() => setReplyCommentId(comment.id)}
              >
                <RiReplyFill size={18} className="mr-1 mt-1" />{" "}
                <span>Responder</span>
              </button>
            )}
            {replyCommentId === comment.id && (
              <div className="mt-4">
                <textarea
                  className="w-full p-4 border rounded-lg"
                  placeholder="Escribe una respuesta..."
                  rows="3"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <button
                  className="mt-2 px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  onClick={() => handleCreateComment(comment.id)}
                  disabled={isSubmitting}
                >
                  Responder
                </button>
                <button
                  className="mt-2 ml-2 px-10 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  onClick={() => {
                    setReplyContent("");
                    setReplyCommentId(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
              </div>
            )}
          </li>
          {/* Renderizar respuestas por fuera del contenedor del padre */}
          <ul className="pl-6">{renderComments(comments, comment.id)}</ul>
        </div>
      ));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold">Lista de Comentarios</h2>
      <div className="font-semibold text-lg text-gray-600 mb-2">
        {event.data.commentsCount} comentarios
      </div>
      {isAuthenticated ? (
        <div>
          <ul className="divide-y divide-gray-200">
            {event.data.comments && event.data.comments.length > 0 ? (
              renderComments(event.data.comments)
            ) : (
              <span className="text-lg text-gray-600 font-semibold">
                No hay comentarios todavía.
              </span>
            )}
          </ul>
          <textarea
            className="w-full p-4 border rounded-lg mt-4"
            placeholder="Escribe un comentario..."
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={() => handleCreateComment()}
            disabled={isSubmitting}
          >
            Enviar
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/security/login"
            className="text-blue-700 text-lg font-semibold hover:underline"
          >
            <span className="flex">
              <PiWarningCircleBold size={22} className="mt-1 mr-1" />
              Iniciar sesión para visualizar la lista de comentarios
            </span>
          </Link>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};
